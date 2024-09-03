import { RequestHandler } from "express";
import Tasks from "../models/tasksModel.js";
import { SqliteError } from "better-sqlite3";

function handleError(e: unknown) {
    console.error(e);
    let msg = "Error";
    let code = "9999";

    if (e instanceof SqliteError) {
        msg = e.message;
        code = e.code;
    } else if (e instanceof Error) {
        msg = e.message;
    }

    return {
        msg,
        code,
    };
}

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
        const info = Tasks.create(req.body);
        if (info.changes === 0) {
            return res.status(400).json({ msg: "Invalid Body" });
        }
        return res.status(200).json({
            task: {
                id: info.lastInsertRowid,
            },
        });
    } catch (e) {
        return res.status(500).json(handleError(e));
    }
};

const getTask: RequestHandler = (req, res) => {
    try {
        const task = Tasks.getById(+req.params.id);
        if (task === undefined) {
            return res.status(404).json();
        }
        return res.status(200).json({ task });
    } catch (e) {
        return res.status(500).json(handleError(e));
    }
};

const updateTask: RequestHandler = (req, res) => {
    try {
        const info = Tasks.update(+req.params.id, req.body);
        if (info.changes === 0) {
            return res.status(404).json();
        }
        return res.status(204);
    } catch (e) {
        return res.status(500).json(handleError(e));
    }
};

const deleteTask: RequestHandler = (req, res) => {
    try {
        Tasks.delete(+req.params.id);
        return res.status(204);
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
