import { RequestHandler } from "express";
import Tasks from "../models/tasksModel.js";

const getTasks: RequestHandler = (_req, res) => {
    res.json({ tasks: Tasks.findAll() });
};

export default {
    getTasks,
};
