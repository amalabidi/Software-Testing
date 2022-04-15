var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();
chai.use(chaiHttp);
const { User } = require("../modules/user");

describe("/POST user", () => {
    it("it should not create a user without email address", (done) => {
        let user = new User({
            username: "Amal",
            password: "hahahha",
            address: "jjj",
        });
        chai
            .request(server)
            .post("/users")
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
            username: "Amal",
            password: "hahahha",
            email: "kjljl",
            address: "jjj",
        });
        chai
            .request(server)
            .post("/users")
            .type("json")
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("errors");
                res.body.errors.should.be.eql("email already exists");
                done();
            });
    });

    it("it should create a user ", (done) => {
        let user = new User({
            username: "Amal",
            hashedPassword: "hahahha",
            email: "kiolmm",
            address: "jjj",
        });

        chai
            .request(server)
            .post("/users")
            .type("json")
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);

                res.body.should.be.a("object");

                res.body.should.have.property("user");

                res.body.user.should.have.property("username");
                done();
            });
    });
});
// get users
describe("/GET user", () => {
    it("it should GET all the users", (done) => {
        chai
            .request(server)
            .get("/users")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array");

                done();
            });
    });
});

describe("/PUT user", () => {
    it("it should update a user given an id", (done) => {
        let Newuser = new User({
            email: "doe@email.com",
            username: "doe hello",
            hashedPassword: "pass",
        });
        id = "625871670bde2b3638d7fd0b";

        chai
            .request(server)
            .put("/users/" + id)
            .type("json")
            .send({
                email: "doe@email.com",
                username: "doe hello",
                hashedPassword: "pass",
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("message").eql("User updated");
                res.body.user.should.have.property("email").eql("doe@email.com");
                done();
            });
    });
});

describe("/DELETE/:id user", () => {
    it("it should delete a user given an id", (done) => {
        id = "62587132d8c3f12f5c8b9026";

        chai
            .request(server)
            .delete("/users/" + id)
            .type("json")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("message").eql("User deleted");
                done();
            });
    });
});