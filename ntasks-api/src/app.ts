import express from "express";
import TasksRouter from "./routes/tasksRoutes.js";

const app = express();

app.set("json spaces", 4); // The 'space' argument used by `JSON.stringify`.

app.get("/", (_req, res) => {
    res.json({ status: "NTask API" });
});

app.use("/", TasksRouter);

export default app;
