import { RequestHandler } from "express";
import Users from "../models/usersModel.js";
import jwt from "jsonwebtoken";
import config from "../configs/config.js";

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

    const token = jwt.sign({ id: user.id }, config.JWT_SECRET);

    return res.status(200).json({ token });
};

const isLogged: RequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).end();
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).end();
    }

    try {
        const payload = jwt.verify(token, config.JWT_SECRET) as { id: number };
        const user = Users.getById(payload.id);
        if (!user) {
            return res.status(401).end();
        }
        res.locals.user = user;
        next();
    } catch (e) {
        console.error(e);
        return res.status(401).end();
    }
};

export default {
    isLogged,
    signIn,
};
