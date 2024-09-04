import { Router } from "express";
import TasksController from "../controllers/tasksController.js";

const taskRouter = Router();

taskRouter
    .route("/")
    .get(TasksController.getTasks)
    .post(TasksController.createTask);

taskRouter
    .route("/:id")
    .get(TasksController.getTask)
    .put(TasksController.updateTask)
    .delete(TasksController.deleteTask);

export default taskRouter;
