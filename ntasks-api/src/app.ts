import express from "express";
import TasksRouter from "./routes/tasksRoutes.js";
import UserRouter from "./routes/usersRoutes.js";
import cors from "cors";
import logger from "./configs/logger.js";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";

const app = express();

// Logging
app.use(
    morgan("common", {
        stream: {
            write: (message: string) => {
                logger.info(message);
            },
        },
    }),
);

app.set("json spaces", 4); // The 'space' argument used by `JSON.stringify`.

// Protection for HTTP Headers
app.use(helmet());

// Middleware to parse body requests of Content-Type: application/json
// the body of the request object will be populated with the body from the request
app.use(express.json());

/**
 * Cross-origin resource sharing (CORS) is an important HTTP mechanism. It is responsible
 * for allowing or denying asynchronous requests from other domains.
 * CORS, in practice, includes only the HTTP headers that are included on the
 * server side. Those headers can indicate which domain can consume the API, which
 * HTTP methods are allowed, and, mainly, which endpoints can be shared publicly for
 * applications from other domains to consume. Generally when implementing CORS in a
 * browser, each cross-origin request will be preceded by an OPTIONS request that checks
 * whether the GET or POST will be okay.
 * */
app.use(
    cors({
        origin: ["http://localhost:3001"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }),
);

// Compression responses
app.use(compression());

/**
 * @api {get} / API Status
 * @apiGroup Status
 * @apiSuccess {String} status API Status' message
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {"status": "NTask API"}
 * */
app.get("/", (_req, res) => {
    res.json({ status: "NTask API" });
});

app.use("/api/v1/tasks", TasksRouter);
app.use("/api/v1/users", UserRouter);

app.use(express.static("public"));

export default app;
