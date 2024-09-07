import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import app from "../../src/app.js";
import Users from "../../src/models/usersModel.js";

describe("Routes: SignIn", () => {
    const request = supertest(app);
    const route = "/api/v1/users/signin";

    describe("POST /api/v1/users/signin", () => {
        beforeEach((done) => {
            Users.connection.db.prepare("DELETE FROM users").run();
            Users.create({ name: "test", password: "test", email: "test" });
            done();
        });

        describe("status 200", () => {
            it("returns authenticated user token", (done) => {
                request
                    .post(route)
                    .send({
                        email: "test",
                        password: "test",
                    })
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body).to.include.keys("token");
                        done(err);
                    });
            });
        });

        describe("status 401", () => {
            it("throws error when password is incorrect", (done) => {
                request
                    .post(route)
                    .send({ email: "test", password: "wrongPassword" })
                    .expect(401)
                    .end((err, _res) => done(err));
            });
            it("throws error when email not exits", (done) => {
                request
                    .post(route)
                    .send({ email: "wrong_email", password: "test" })
                    .expect(401)
                    .end((err, _res) => done(err));
            });
            it("throws error when email and password is blank", (done) => {
                request
                    .post(route)
                    .expect(401)
                    .end((err, _res) => done(err));
            });
        });
    });
});
