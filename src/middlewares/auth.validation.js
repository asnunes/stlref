import connection from "../database/db.js";
export default async function authValidation(req, res, next) {
  const auth = req.headers.authorization;

  if (auth === undefined) {
    res.status(401).send({ message: "Sem autorização." });
    return;
  }
  if (!auth.includes("Bearer ")) {
    res.status(401).send({ message: "Formato da autorização inválido." });
    return;
  }

  const token = auth.replace("Bearer ", "");

  const user = (
    await connection.query("SELECT * FROM users WHERE token=$1;", [token])
  ).rows[0];
  if (!user) {
    res.status(401).send({ message: "Nenhum usúario para esse token." });
    return;
  }

  res.locals.user = user;
  next();
}
