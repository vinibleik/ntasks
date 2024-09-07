import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import app from "../../src/app.js";
import Users from "../../src/models/usersModel.js";
import Tasks, { Task } from "../../src/models/tasksModel.js";

describe("Tasks Routes", () => {
    const request = supertest(app);
    const baseRoute = "/api/v1/tasks";
    let tasks: Task[] = [];
    let token: string = "";

    beforeEach((done) => {
        Users.connection.db.prepare("DELETE FROM users").run();
        const user = Users.create({
            name: "test",
            password: "test",
            email: "test",
        });

        if (!user) {
            throw new Error("User not created");
        }

        Tasks.connection.db.prepare("DELETE FROM tasks").run();
        tasks = [];
        for (let i = 0; i < 3; i++) {
            const t = Tasks.create({
                title: `task_${i}`,
                // @ts-ignore
                user_id: user.id,
            });
            if (t) {
                tasks.push(t);
            }
        }

        request
            .post("/api/v1/users/signin")
            .send({ email: "test", password: "test" })
            .expect(200)
            .end((err, res) => {
                token = res.body.token;
                done(err);
            });
    });

    describe(`GET ${baseRoute}/`, () => {
        describe("status 200", () => {
            it("returns a list of tasks", (done) => {
                request
                    .get(baseRoute)
                    .set("Authorization", `Bearer ${token}`)
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body).to.have.keys("tasks");
                        expect(res.body.tasks).to.have.length(3);
                        for (let i = 0; i < 3; i++) {
                            expect(res.body.tasks[i].title).to.eql(`task_${i}`);
                        }
                        done(err);
                    });
            });
        });
    });

    describe(`POST ${baseRoute}/`, () => {
        describe("status 200", () => {
            it("creates a new task", (done) => {
                request
                    .post(baseRoute)
                    .set("Authorization", `Bearer ${token}`)
                    .send({ title: "title_4" })
                    .expect(201)
                    .end((err, res) => {
                        expect(res.body).to.have.key("task");
                        expect(res.body.task).to.have.keys(
                            "id",
                            "title",
                            "user_id",
                            "done",
                        );
                        expect(res.body.task.title).to.eql("title_4");
                        expect(res.body.task.done).to.be.false;
                        done(err);
                    });
            });
        });
    });

    describe(`GET ${baseRoute}/:id`, () => {
        describe("status 200", () => {
            it("returns one task", (done) => {
                const t = tasks[0];
                request
                    .get(`${baseRoute}/${t.id}`)
                    .set("Authorization", `Bearer ${token}`)
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body).to.have.key("task");
                        expect(res.body.task).to.eql(t);
                        done(err);
                    });
            });
        });

        describe("status 404", () => {
            it("throws error when task not exist", (done) => {
                request
                    .get(`${baseRoute}/9999999999`)
                    .set("Authorization", `Bearer ${token}`)
                    .expect(404)
                    .end((err, _res) => {
                        done(err);
                    });
            });
        });
    });

    describe("PUT /api/v1/tasks/:id", () => {
        describe("status 204", () => {
            it("updates a task", (done) => {
                const t = tasks[0];
                request
                    .put(`${baseRoute}/${t.id}`)
                    .set("Authorization", `Bearer ${token}`)
                    .send({ title: "Travel", done: true })
                    .expect(204)
                    .end((_err, _res) => {});
                request
                    .get(`${baseRoute}/${t.id}`)
                    .set("Authorization", `Bearer ${token}`)
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body).to.have.key("task");
                        expect(res.body.task).to.eql({
                            ...t,
                            title: "Travel",
                            done: true,
                        });
                        done(err);
                    });
            });
        });
    });

    describe("DELETE /api/v1/tasks/:id", () => {
        describe("status 204", () => {
            it("it removes a task", (done) => {
                const t = tasks[0];
                request
                    .delete(`${baseRoute}/${t.id}`)
                    .set("Authorization", `Bearer ${token}`)
                    .expect(204)
                    .end((_err, _res) => {});
                request
                    .get(`${baseRoute}/${t.id}`)
                    .set("Authorization", `Bearer ${token}`)
                    .expect(404)
                    .end((err, _res) => {
                        done(err);
                    });
            });
        });
    });
});
