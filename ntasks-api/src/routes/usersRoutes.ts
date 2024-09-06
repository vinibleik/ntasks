import { Router } from "express";
import UsersController from "../controllers/usersController";
import AuthController from "../controllers/authController";

const userRouter = Router();

userRouter.post("/signin", AuthController.signIn);

userRouter
    .route("/")
    .post(UsersController.createUser)
    .get(AuthController.isLogged, UsersController.getUser)
    .delete(AuthController.isLogged, UsersController.deleteUser);

export default userRouter;
