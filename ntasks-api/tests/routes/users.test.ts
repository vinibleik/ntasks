import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import app from "../../src/app.js";
import Users from "../../src/models/usersModel.js";
import jwt from "jsonwebtoken";
import config from "../../src/configs/config.js";

describe("Users routes", () => {
    const request = supertest(app);
    const baseUrl = "/api/v1/users";
    let token: string = "";

    beforeEach((done) => {
        Users.connection.db.prepare("DELETE FROM users").run();
        const user = Users.create({
            name: "test",
            password: "test",
            email: "test",
        });
        if (!user) {
            throw new Error("Error creating user");
        }
        token = jwt.sign({ id: user.id }, config.JWT_SECRET);
        done();
    });

    describe(`GET ${baseUrl}`, () => {
        describe("status 200", () => {
            it("returns an authenticated user", (done) => {
                request
                    .get(baseUrl)
                    .set("Authorization", `Bearer ${token}`)
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body).to.have.key("user");
                        expect(res.body.user).to.have.keys(
                            "id",
                            "name",
                            "email",
                        );
                        expect(res.body.user.name).to.eq("test");
                        expect(res.body.user.email).to.eq("test");
                        done(err);
                    });
            });
        });
    });

    describe(`DELETE ${baseUrl}`, () => {
        describe("status 204", () => {
            it("deletes an authenticated user", (done) => {
                request
                    .delete(baseUrl)
                    .set("Authorization", `Bearer ${token}`)
                    .expect(204)
                    .end((err, _res) => done(err));
            });
        });
    });

    describe(`POST ${baseUrl}`, () => {
        describe("status 200", () => {
            it("creates a new user", (done) => {
                request
                    .post(baseUrl)
                    .send({
                        name: "new_name",
                        email: "new_name",
                        password: "new_name",
                    })
                    .expect(201)
                    .end((err, res) => {
                        expect(res.body).to.have.key("user");
                        expect(res.body.user).to.have.keys(
                            "id",
                            "name",
                            "email",
                        );
                        expect(res.body.user.name).to.eq("new_name");
                        expect(res.body.user.email).to.eq("new_name");
                        done(err);
                    });
            });
        });
    });
});
