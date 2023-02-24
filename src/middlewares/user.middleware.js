import { userSchema, userSchemaLogin } from "../models/user.schema.js";
import connection from '../database/db.js';
import bcrypt from "bcrypt";

export  async function userValidation(req, res, next) {
    const user = req.body;
    const { error } = userSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    try {
        const userExist = await connection.query("SELECT * FROM users WHERE email=$1;", [user.email]);
        if (userExist.rowCount > 0) {
            res.status(409).send({ message: "Email já está em uso." });
            return;
        }
    } catch (err) {
        res.sendStatus(500)
    }
    res.locals.user = user;
    next();
}

export async function signInBodyValidation(req, res, next) {
    const { email, password } = req.body;

    const { error } = userSchemaLogin.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    try {
        const userExist = await connection.query("SELECT * FROM users WHERE email=$1;", [email]);
        
        if (userExist.rowCount <= 0) {
            res.status(401).send({ message: "email incorreto" });
            return;
        }
        const passwordOk = bcrypt.compareSync(password, userExist.rows[0].password);
        if (!passwordOk) {
            res.status(401).send({ message: "Senha incorreta" });
            return;
        }
        const user = userExist.rows[0];
        res.locals.user = user;
        next();
    } catch (err) {
        res.sendStatus(500);
    }


}