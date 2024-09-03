import express from "express";
import TasksRouter from "./routes/tasksRoutes.js";

const app = express();

app.set("json spaces", 4); // The 'space' argument used by `JSON.stringify`.

// Middleware to parse body requests of Content-Type: application/json
// the body of the request object will be populated with the body from the request
app.use(express.json());

app.get("/", (_req, res) => {
    res.json({ status: "NTask API" });
});

app.use("/", TasksRouter);

export default app;
