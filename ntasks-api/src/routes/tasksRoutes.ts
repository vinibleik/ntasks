import { Router } from "express";
import TasksController from "../controllers/tasksController.js";

const taskRouter = Router();

taskRouter.get("/tasks", TasksController.getTasks);

export default taskRouter;
