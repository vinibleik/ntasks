import { describe, it } from "mocha";
import { expect } from "chai";
import request from "supertest";
import app from "../../src/app.js";

describe("Routes: Index", () => {
    describe("GET /", () => {
        it("returns the API status", (done) => {
            request(app)
                .get("/")
                .expect(200)
                .end((err, res) => {
                    const expected = { status: "NTask API" };
                    expect(res.body).to.eql(expected);
                    done(err);
                });
        });
    });
});
