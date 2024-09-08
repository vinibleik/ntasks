import { Router } from "express";
import TasksController from "../controllers/tasksController.js";
import AuthController from "../controllers/authController.js";

const taskRouter = Router();

taskRouter.use(AuthController.isLogged);

taskRouter
    .route("/")
    /**
     * @api {get} /api/v1/tasks List the user's tasks
     * @apiGroup Tasks
     * @apiHeader {String} Authorization Token of authenticated user
     * @apiHeaderExample {json} Request Header
     *  {"Authorization": "Bearer bearer-token-example"}
     * @apiSuccess {Object[]} tasks Task list
     * @apiSuccess {Number} tasks.id Task id
     * @apiSuccess {Number} tasks.user_id Task's user id
     * @apiSuccess {String} tasks.title Task title
     * @apiSuccess {Boolean} tasks.done Task is done?
     * @apiSuccessExample {json} Response Success
     *  HTTP/1.1 200 OK
     *  {
     *      "tasks": [
     *          {
     *              "id": 1,
     *              "user_id": 1
     *              "title": "Study",
     *              "done": false,
     *          }
     *      ]
     *  }
     * @apiError {String} error Error string
     * @apiError {String} message Error message
     * @apiErrorExample {json} Internal Error
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "error": "Internal Server Error",
     *      "message": "Something went wrong"
     *  }
     * @apiErrorExample Authentication Error
     *  HTTP/1.1 401 Unauthorized
     * */
    .get(TasksController.getTasks)
    /**
     * @api {post} /api/v1/tasks Register a new task
     * @apiGroup Tasks
     * @apiHeader {String} Authorization Token of authenticated user
     * @apiHeaderExample {json} Request Header
     *  {"Authorization": "Bearer bearer-token-example"}
     * @apiParam {String} title Task title
     * @apiParamExample {json} Request body
     *  {"title": "Study"}
     * @apiSuccess {Number} task Created Task
     * @apiSuccess {Number} task.id Task id
     * @apiSuccess {Number} task.user_id Task's user id
     * @apiSuccess {String} task.title Task title
     * @apiSuccess {Boolean} task.done Task is done?
     * @apiSuccessExample {json} Response Success
     *  HTTP/1.1 204 Created
     *  {
     *      "task": {
     *          "id": 1,
     *          "user_id": 1
     *          "title": "Study",
     *          "done": false,
     *      }
     *  }
     * @apiError {String} error Error string
     * @apiError {String} message Error message
     * @apiErrorExample {json} Internal Error
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "error": "Internal Server Error",
     *      "message": "Something went wrong"
     *  }
     * @apiErrorExample {json} Bad Request
     *  HTTP/1.1 400 Bad Request
     *  {
     *      "error": "Bad Request",
     *      "message": "Invalid body"
     *  }
     * @apiErrorExample Authentication Error
     *  HTTP/1.1 401 Unauthorized
     * */
    .post(TasksController.createTask);

taskRouter
    .route("/:id")
    /**
     * @api {get} /api/v1/tasks/:id Get a task
     * @apiGroup Tasks
     * @apiHeader {String} Authorization Token of authenticated user
     * @apiHeaderExample {json} Request Header
     *  {"Authorization": "Bearer bearer-token-example"}
     * @apiParam {id} id Task id
     * @apiSuccess {Number} task Task
     * @apiSuccess {Number} task.id Task id
     * @apiSuccess {Number} task.user_id Task's user id
     * @apiSuccess {String} task.title Task title
     * @apiSuccess {Boolean} task.done Task is done?
     * @apiSuccessExample {json} Response Success
     *  HTTP/1.1 200 OK
     *  {
     *      "task": {
     *          "id": 1,
     *          "user_id": 1
     *          "title": "Study",
     *          "done": false,
     *      }
     *  }
     * @apiError {String} error Error string
     * @apiError {String} message Error message
     * @apiErrorExample {json} Internal Error
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "error": "Internal Server Error",
     *      "message": "Something went wrong"
     *  }
     * @apiErrorExample {json} Internal Error
     *  HTTP/1.1 404 Not Found
     *  {
     *      "error": "Not Found",
     *      "message": "Task with id 999 not found"
     *  }
     * @apiErrorExample Authentication Error
     *  HTTP/1.1 401 Unauthorized
     * */
    .get(TasksController.getTask)
    /**
     * @api {put} /api/v1/tasks/:id Update a task
     * @apiGroup Tasks
     * @apiHeader {String} Authorization Token of authenticated user
     * @apiHeaderExample {json} Request Header
     *  {"Authorization": "Bearer bearer-token-example"}
     * @apiParam {id} id Task id
     * @apiParam {String} title Task title
     * @apiParam {Boolean} done Task is done
     * @apiParamExample {json} Request body
     *  {
     *      "title": "Study2"
     *      "done": true
     *  }
     * @apiSuccess {Number} task Task
     * @apiSuccess {Number} task.id Task id
     * @apiSuccess {Number} task.user_id Task's user id
     * @apiSuccess {String} task.title Task title
     * @apiSuccess {Boolean} task.done Task is done?
     * @apiSuccessExample {json} Response Success
     *  HTTP/1.1 200 OK
     *  {
     *      "task": {
     *          "id": 1,
     *          "user_id": 1
     *          "title": "Study2",
     *          "done": true,
     *      }
     *  }
     * @apiError {String} error Error string
     * @apiError {String} message Error message
     * @apiErrorExample {json} Internal Error
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "error": "Internal Server Error",
     *      "message": "Something went wrong"
     *  }
     * @apiErrorExample {json} Internal Error
     *  HTTP/1.1 404 Not Found
     *  {
     *      "error": "Not Found",
     *      "message": "Task with id 999 not found"
     *  }
     * @apiErrorExample {json} Bad Request
     *  HTTP/1.1 400 Bad Request
     *  {
     *      "error": "Bad Request",
     *      "message": "Invalid body"
     *  }
     * @apiErrorExample Authentication Error
     *  HTTP/1.1 401 Unauthorized
     * */
    .put(TasksController.updateTask)
    /**
     * @api {delete} /api/v1/tasks/:id Delete a Task
     * @apiGroup Tasks
     * @apiHeader {String} Authorization Token of authenticated user
     * @apiHeaderExample {json} Request Header
     *  {"Authorization": "Bearer bearer-token-example"}
     * @apiParam {id} id Task id
     * @apiSuccessExample {json} Response Success
     *  HTTP/1.1 204 No Content
     * @apiError {String} error Error string
     * @apiError {String} message Error message
     * @apiErrorExample {json} Internal Error
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "error": "Internal Server Error",
     *      "message": "Something went wrong"
     *  }
     * @apiErrorExample {json} Internal Error
     *  HTTP/1.1 404 Not Found
     *  {
     *      "error": "Not Found",
     *      "message": "Task with id 999 not found"
     *  }
     * @apiErrorExample {json} Bad Request
     *  HTTP/1.1 400 Bad Request
     *  {
     *      "error": "Bad Request",
     *      "message": "Invalid body"
     *  }
     * @apiErrorExample Authentication Error
     *  HTTP/1.1 401 Unauthorized
     *  */
    .delete(TasksController.deleteTask);

export default taskRouter;
