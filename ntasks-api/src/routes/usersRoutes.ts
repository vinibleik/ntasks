import { Router } from "express";
import UsersController from "../controllers/usersController";

const userRouter = Router();

userRouter.post("/", UsersController.createUser);

userRouter
    .route("/:id")
    .get(UsersController.getUser)
    .delete(UsersController.deleteUser);

export default userRouter;
