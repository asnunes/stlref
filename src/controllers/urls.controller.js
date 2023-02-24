import { nanoid } from "nanoid";
import connection from "../database/db.js";

export async function postShortenUrl(req, res) {
  const user = res.locals.user;
  const { url } = req.body;
  const shortUrl = nanoid();

  try {
    const encurtUrl = await connection.query(
      `INSERT INTO urls (url, "shortUrl", user_id) VALUES ($1, $2, $3) RETURNING id;`,
      [url, shortUrl, user.id]
    );
    res.status(201).send({
      message: "Url shortend.",
      shortUrl: shortUrl,
      id: encurtUrl.rows[0].id,
    });
    return;
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function getUrlById(req, res) {
  const { id } = req.params;
  try {
    const url = (
      await connection.query("SELECT * FROM urls WHERE id=$1;", [id])
    ).rows[0];

    if (!url) {
      res.status(404).send({ message: "Esse Id de url não existe." });
      return;
    }
    res.status(200).send({
      id: url.id,
      shortUrl: url.shortUrl,
      url: url.url,
    });
    return;
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function getShortUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    const urlShort = (
      await connection.query(`SELECT * FROM urls WHERE "shortUrl"=$1;`, [
        shortUrl,
      ])
    ).rows[0];

    if (!urlShort) {
      res.status(404).send({ message: "Essa shortUrl não existe." });
      return;
    }
    await connection.query(`UPDATE urls SET visits=$1 WHERE "shortUrl"=$2;`, [
      Number(urlShort.visits) + 1,
      urlShort.shortUrl,
    ]);
    res.redirect(urlShort.url);
    return;
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function deleteUrl(req, res) {
  const user = res.locals.user;
  const { id } = req.params;

  try {
    const urlExist = (
      await connection.query("SELECT * FROM urls WHERE id=$1;", [id])
    ).rows[0];
    if (!urlExist) {
      res.status(404).send({ message: "Essa shortUrl não existe." });
      return;
    }

    const userUrlExist = (
      await connection.query("SELECT * FROM urls WHERE id=$1 AND user_id=$2;", [
        id,
        user.id,
      ])
    ).rows[0];

    if (!userUrlExist) {
      res
        .status(401)
        .send({ message: "Essa shortUrl não existe para esse usúario" });
      return;
    }

    await connection.query("DELETE FROM urls WHERE id=$1;", [userUrlExist.id]);
    res.status(204).send({ message: "Url deletada." });
    return;
  } catch (err) {
    res.sendStatus(500);
  }
}
