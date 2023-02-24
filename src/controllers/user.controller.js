import connection from '../database/db.js';
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
    const { name, email, password } = res.locals.user;

    const passwordHash = bcrypt.hashSync(password, 10);

    try {
        await connection.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3);", [name, email, passwordHash]);
        res.sendStatus(201);

    } catch (err) {
        res.sendStatus(500);
    }
}

export async function signIn(req, res) {
    const user = res.locals.user;

    const token = uuid();

    try {
        await connection.query("UPDATE users SET token=$1 WHERE id=$2;", [token, user.id]);
        res.status(200).send({ message: "você se conectou.", token: token });
        return;
    } catch (err) {
        console.log(err)
        res.sendStatus(500);
    }
}

export async function getUserMe(req, res) {
    const user = res.locals.user


    try {
        const sum_visits = (await connection.query(
            "SELECT SUM(visits) AS visits FROM urls WHERE user_id=$1;",
            [user.id]
        )).rows[0].visits;

        const userUrls = (await connection.query(
            `SELECT id, "shortUrl", url, visits AS "visitCount" FROM urls WHERE user_id=$1;`,
            [user.id]
        )).rows;

        res.status(200).send({
            id: user.id,
            name: user.name,
            visitCount: sum_visits,
            shortenedUrls: userUrls,
        });
        return;
    } catch (err) {
        res.sendStatus(500);
    }
}

export async function getUsersRanking(req, res) {
    try {
        const ranking10 = await connection.query(
        `SELECT users.id, users.name, SUM(urls.visits) AS "visitCount", COUNT(urls.id) AS "linksCount"
        FROM urls
        LEFT JOIN users
        ON users.id=urls.user_id
        GROUP BY users.id
        ORDER BY "visitCount" DESC, id ASC
        LIMIT 10;`
        );

        res.status(200).send(ranking10.rows);
        return;
    } catch (err) {
        console.log(err)
        res.status(500).send({error :err});
    }
}