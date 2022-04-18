var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();
chai.use(chaiHttp);
const { User } = require("../modules/user");

describe("display projects when login is succeeded", () => {
    it("it shouldn't sign in with a non existing user", (done) => {
        let user = {
            email: "kiolm@outlook.com",
            password: "hahahha",
        };
        chai
            .request(server)
            .post("/login")
            .type("json")
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("error");
                res.body.error.should.be.eql("invalid mail or password");
                done();
            });
    });
    it("it should return success for the login and the list of projects ", (done) => {
        let user = {
            email: "kiolmm",
            password: "hahahha",
        };
        chai
            .request(server)
            .post("/login")
            .type("json")
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("success");
                res.body.should.have.property("projects");
                res.body.success.should.be.eql("you are in ! ");
                res.body.projects.should.be.a("array");
                done();
            });
    });
    it("after login it should return the projects created by the user ", (done) => {
        let user = {
            email: "kiolmm",
            password: "hahahha",
        };
        chai
            .request(server)
            .post("/login")
            .type("json")
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("success");
                res.body.should.have.property("projects");
                res.body.should.have.property("user");

                res.body.success.should.be.eql("you are in ! ");
                res.body.projects.should.be.a("array");

                id = res.body.user._id;
                chai
                    .request(server)
                    .get("/projects/" + id)

                .end((err, res) => {
                    res.body.should.have.property("errors");

                    res.body.errors.should.be.eql("you don't have any project yet");
                });
                done();
            });
    });
});
// get users
describe("Get details about the collaborators in a project", () => {
    it("it should throw an error when trying to get collaborators of a non existing project  ", (done) => {
        id = "625d7631a1e9c5327c09b289";
        chai
            .request(server)
            .get("/collab/" + id)
            .end((err, res) => {
                res.should.have.status(200);

                res.body.should.have.property("error");
                res.body.error.should.be.eql("project non existent");

                done();
            });
    });
    it("it should GET all the users collaborating in the project defined by the id ", (done) => {
        id = "625d7631a1e9c5327c09b288";
        chai
            .request(server)
            .get("/collab/" + id)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("result");
                res.body.result.should.be.a("array");

                done();
            });
    });
});
describe("add a collaborator to a project", () => {
    it("it should throw an error when user doesn't have the permission", (done) => {
        details = {
            userid: "6258726cfb773220fcd4f341",
            projectId: "625d7631a1e9c5327c09b288",
            idLeader: "6359ed22256a940be0d0987e",
        };

        chai
            .request(server)
            .post("/collab")

        .type("json")
            .send(details)
            .end((err, res) => {
                res.should.have.status(200);

                res.body.should.have.property("error");
                res.body.error.should.be.eql(
                    "you don't have the permission to add this user"
                );

                done();
            });
    });
    it("it should throw an error when the project doesn't exist", (done) => {
        details = {
            userid: "6258726cfb773220fcd4f341",
            projectId: "605d7631a1e9c5327c09b288",
            idLeader: "6259ed22256a940be0d0987e",
        };
        chai
            .request(server)
            .post("/collab")

        .type("json")
            .send(details)
            .end((err, res) => {
                res.should.have.status(200);

                res.body.should.have.property("error");
                res.body.error.should.be.eql("project doesn't exist");

                done();
            });
    });
    it("it should throw an error when the user is already collaborator", (done) => {
        details = {
            userid: "6259ed22256a940be0d0987e",
            projectId: "625d7631a1e9c5327c09b288",
            idLeader: "6259ed22256a940be0d0987e",
        };
        chai
            .request(server)
            .post("/collab")

        .type("json")
            .send(details)
            .end((err, res) => {
                res.should.have.status(200);

                res.body.should.have.property("error");
                res.body.error.should.be.eql("user already exists");

                done();
            });
    });
    it("it should add a user as a collaborator", (done) => {
        details = {
            userid: "6258726cfb773220fcd4f341",
            projectId: "625d7631a1e9c5327c09b288",
            idLeader: "6259ed22256a940be0d0987e",
        };
        chai
            .request(server)
            .post("/collab")

        .type("json")
            .send(details)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("success");
                res.body.success.should.be.eql("done");

                done();
            });
    });
});

