import { RequestHandler } from "express";
import Tasks from "../models/tasksModel.js";
import { handleError } from "../helpers/errorHandler.js";

const getTasks: RequestHandler = (_req, res) => {
    try {
        const tasks = Tasks.getAll();
        return res.status(200).json({ tasks });
    } catch (e) {
        return res.status(500).json(handleError(e));
    }
};

const createTask: RequestHandler = (req, res) => {
    try {
        const task = Tasks.create(req.body);
        if (!task) {
            return res.status(400).json({
                error: "Bad Request",
                message: "Body to create Task is invalid.",
            });
        }
        return res.status(201).json({ task });
    } catch (e) {
        return res.status(500).json(handleError(e));
    }
};

const getTask: RequestHandler = (req, res) => {
    try {
        const task = Tasks.getById(+req.params.id);
        if (!task) {
            return res.status(404).json({
                error: "Not Found",
                message: `Task with id ${+req.params.id} not found.`,
            });
        }
        return res.status(200).json({ task });
    } catch (e) {
        return res.status(500).json(handleError(e));
    }
};

const updateTask: RequestHandler = (req, res) => {
    try {
        if (!req.body.title && !req.body.done) {
            return res.status(400).json({
                error: "Bad Request",
                message: "Body to update Task is invalid.",
            });
        }
        const task = Tasks.update(+req.params.id, req.body);
        if (!task) {
            return res.status(404).json({
                error: "Not Found",
                message: `Task with id ${+req.params.id} not found.`,
            });
        }
        return res.status(200).json({ task });
    } catch (e) {
        return res.status(500).json(handleError(e));
    }
};

const deleteTask: RequestHandler = (req, res) => {
    try {
        Tasks.delete(+req.params.id);
        return res.status(204).end();
    } catch (e) {
        return res.status(500).json(handleError(e));
    }
};

export default {
    getTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
};
