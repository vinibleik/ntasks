import { Router } from "express";
import UsersController from "../controllers/usersController";
import AuthController from "../controllers/authController";

const userRouter = Router();

/**
 * @api {post} /api/v1/users/signin Authentication Token
 * @apiGroup Credentials
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 * @apiParamExample {json} Input Example
 *   {
 *       "email": "john@connor.net",
 *       "password": "123456"
 *   }
 * @apiSuccess {String} token Token of authenticated user
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 200 OK
 *   {
 *       "token": "bearer-token-example"
 *   }
 * @apiErrorExample Authentication error
 *   HTTP/1.1 401 Unauthorized
 * */
userRouter.post("/signin", AuthController.signIn);

userRouter
    .route("/")
    /**
     * @api {post} /api/v1/users Register a new user
     * @apiGroup User
     * @apiParam {String} name User name
     * @apiParam {String} email User email
     * @apiParam {String} password User password
     * @apiParamExample {json} Input
     *   {
     *       "name": "John Connor",
     *       "email": "john@connor.net",
     *       "password": "123456"
     *   }
     * @apiSuccess {Number} id User id
     * @apiSuccess {String} name User name
     * @apiSuccess {String} email User email
     * @apiSuccess {String} password User encrypted password
     * @apiSuccessExample {json} Success
     *   HTTP/1.1 200 OK
     *   {
     *       "id": 1,
     *       "name": "John Connor",
     *       "email": "john@connor.net",
     *       "password": "encrypted-password"
     *   }
     * @apiError {String} error Name of the error
     * @apiError {String} message Message of the error
     * @apiErrorExample {json} Find Error
     *  HTTP/1.1 400
     *  {
     *      "error": "Bad Request",
     *      "message": "Invalid body to create user"
     *  }
     */
    .post(UsersController.createUser)
    /**
     * @api {get} /api/v1/users Return the authenticated user's data
     * @apiGroup User
     * @apiHeader {String} Authorization Token of authenticated user
     * @apiHeaderExample {json} Request Header
     *  {"Authorization": "Bearer bearer-token-example"}
     * @apiSuccess {Number} id User id
     * @apiSuccess {String} name User name
     * @apiSuccess {String} email User email
     * @apiSuccessExample {json} Response Success
     *  {
     *      "id": 1,
     *      "name": "John Connor",
     *      "email": "john@connor.net"
     *  }
     * @apiError {String} error Name of the error
     * @apiError {String} message Message of the error
     * @apiErrorExample {json} Find Error
     *  HTTP/1.1 404
     *  {
     *      "error": "Not Found",
     *      "message": "User with id 999 not found."
     *  }
     * @apiErrorExample Authentication error
     *   HTTP/1.1 401 Unauthorized
     * */
    .get(AuthController.isLogged, UsersController.getUser)
    /**
     * @api {delete} /api/v1/users Deletes an authenticated user
     * @apiGroup User
     * @apiHeader {String} Authorization Token of authenticated user
     * @apiHeaderExample {json} Header
     *  {"Authorization": "Bearer bearer-token-example"}
     * @apiSuccessExample {json} Success
     *  HTTP/1.1 204 No Content
     * @apiErrorExample {json} Delete error
     *  HTTP/1.1 500
     *  {
     *      "error": "Internal Server error",
     *      "message": "Something went wrong"
     *  }
     * @apiErrorExample Authentication error
     *   HTTP/1.1 401 Unauthorized
     */
    .delete(AuthController.isLogged, UsersController.deleteUser);

export default userRouter;
