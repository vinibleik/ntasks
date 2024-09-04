import { RequestHandler } from "express";
import Users from "../models/usersModel.js";
import { handleError } from "../helpers/errorHandler.js";

const getUser: RequestHandler = (req, res) => {
    try {
        const user = Users.getById(+req.params.id);
        if (!user) {
            return res.status(404).json({
                error: "Not Found",
                message: `User with id ${+req.params.id} not found.`,
            });
        }

        return res.status(200).json({
            user,
        });
    } catch (e) {
        return res.status(500).json(handleError(e));
    }
};

const createUser: RequestHandler = (req, res) => {
    try {
        const user = Users.create(req.body);
        if (!user) {
            return res.status(400).json({
                error: "Bad Request",
                message: "Body to create user is invalid!",
            });
        }
        return res.status(201).json({ user });
    } catch (e) {
        return res.status(500).json(handleError(e));
    }
};

const deleteUser: RequestHandler = (req, res) => {
    try {
        Users.delete(+req.params.id);
        return res.status(204);
    } catch (e) {
        return res.status(500).json(handleError(e));
    }
};

export default {
    getUser,
    createUser,
    deleteUser,
};
