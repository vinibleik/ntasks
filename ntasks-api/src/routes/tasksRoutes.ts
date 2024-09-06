import { Router } from "express";
import TasksController from "../controllers/tasksController.js";
import AuthController from "../controllers/authController.js";

const taskRouter = Router();

taskRouter.use(AuthController.isLogged);

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
