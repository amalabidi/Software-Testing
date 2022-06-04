var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();
chai.use(chaiHttp);
const { User } = require("../models/User");

describe("/POST user", () => {
    it("it should not create a user without email address", (done) => {
        let user = new User({
            username: "Amal",
            password: "hahahha",
            address: "jjj",
        });
        chai
            .request(server)
            .post("/user/signup")
            .type("json")
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("errors");
                res.body.errors.email.should.be.eql("required");
                done();
            });
    });
    it("it should not create a user with an  email already existing", (done) => {
        let user = new User({
            password: "hahahha",
            email: "joee@gmail.com",
            address: "jjj",
            username: "hehe",
        });
        chai
            .request(server)
            .post("/user/signup")
            .type("json")
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("error");
                res.body.error.should.be.eql("Email exists already !");
                done();
            });
    });
    it("it should not create a user with a username already existing", (done) => {
        let user = new User({
            username: "joee",
            password: "hahahha",
            email: "amalmll@gmail.com",
            address: "jjj",
        });
        chai
            .request(server)
            .post("/user/signup")
            .type("json")
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("error");
                res.body.error.should.be.eql("Username exists already !");
                done();
            });
    });

    it("it should not create a user with a username and an email already existing", (done) => {
        let user = new User({
            username: "joee",
            password: "hahahha",
            email: "joee@gmail.com",
            address: "jjj",
        });
        chai
            .request(server)
            .post("/user/signup")
            .type("json")
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("error");
                res.body.error.should.be.eql("Username and Email exist already !");
                done();
            });
    });
    it("it should create a user ", (done) => {
        let user = new User({
            email: "useyre@gmail.com",
            username: "usueer",
            password: "hahahha",

            address: "jjj",
        });

        chai

            .request(server)
            .post("/user/signup")
            .type("json")
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);

                res.body.should.be.a("object");

                res.body.should.have.property("success");

                res.body.success.should.be.eql("done");
                done();
            });
    });
});
// get users
describe("/GET user", () => {
    it("it should GET all the users", (done) => {
        chai
            .request(server)
            .get("/user")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array");

                done();
            });
    });
});
describe("/DELETE/:id user", () => {
    it("it should delete a user given an id", (done) => {
        id = "6298eb931f7c6d1ba8214fe7";

        chai
            .request(server)
            .delete("/user/" + id)
            .type("json")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("message").eql("User deleted");
                done();
            });
    });
});

describe("/PUT user", () => {
    it("it should throw an error when the username exists", (done) => {
        chai
            .request(server)
            .put("/user/update")
            .type("json")
            .send({
                email: "doe@email.com",
                username: "joe",
                address: "pass",
                password: "hahahha",
                _id: "6298f1f080e4903dc898ca92",
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("error").eql("Username already exists");

                done();
            });
    });
    it("it should throw an error when the email exists", (done) => {
        chai
            .request(server)
            .put("/user/update")
            .type("json")
            .send({
                email: "joe@gmail.com",
                username: "doe hello",
                address: "pass",
                password: "hahahha",
                _id: "6298f1f080e4903dc898ca92",
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("error").eql("Email already exists");

                done();
            });
    });
    it("it should throw an error when the password is incorrect", (done) => {
        chai
            .request(server)
            .put("/user/update")
            .type("json")
            .send({
                email: "dthoy@email.com",
                username: "dooople hello",
                address: "pass",
                password: "haahha",
                _id: "6298f1f080e4903dc898ca92",
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("error").eql("Incorrect Password  !");
                done();
            });
    });
    it("it should update the user given an id", (done) => {
        chai
            .request(server)
            .put("/user/update")
            .type("json")
            .send({
                email: "donyne@email.com",
                username: "usoser",
                address: "pass",
                password: "hahahha",
                _id: "6298f1f080e4903dc898ca92",
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("success");
                res.body.success.should.have.property("email");
                done();
            });
    });
});