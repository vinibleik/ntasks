import { RequestHandler } from "express";
import Users from "../models/usersModel.js";
import jwt from "jsonwebtoken";

const secret = "secret";

const signIn: RequestHandler = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(401).end();
    }

    const user = Users.getByEmail(req.body.email);

    if (!user) {
        return res.status(401).end();
    }

    if (!Users.checkPassword(user, req.body.password)) {
        return res.status(401).end();
    }

    const token = jwt.sign({ id: user.id }, secret);

    return res.status(200).json({ token });
};

const isLogged: RequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("No header or mal formed");
        return res.status(401);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        console.log("no token in header");
        return res.status(401);
    }

    try {
        const payload = jwt.verify(token, secret) as { id: number };
        const user = Users.getById(payload.id);
        if (!user) {
            console.log("No user with id: ", payload.id);
            return res.status(401);
        }
        res.locals.user = user;
        next();
    } catch (e) {
        console.error(e);
        return res.status(401);
    }
};

export default {
    isLogged,
    signIn,
};
