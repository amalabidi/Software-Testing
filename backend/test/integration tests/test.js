describe("display spaces created by a user ", () => {
    it("it should throw an error when the user doesn't exist", (done) => {
        id = "6298edb98f7ff125740d5bbb";
        chai
            .request(server)
            .get("/user/userspaces/" + id)
            .type("json")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("error").eql("user doesn't exist");
                done();
            });
    });
    it("it should return the list of spaces created by the user ", (done) => {
        id = "6298edb98f7ff125740d8bbb";
        chai
            .request(server)
            .get("/user/userspaces/" + id)
            .type("json")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array");
                done();
            });
    });
});
describe("add review to a space specified by id", () => {
    it("it should add a review to the space ", (done) => {
        chai
            .request(server)
            .post("/review/addReview")
            .type("json")
            .send({
                workspace: "629941d302682b2e18f155ec",
                email: "hhh",
                name: "hhhh",
                review: "jjjj",
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("response");
                done();
            });
    });
});

describe("create a space and add it to the user's workspaces ", () => {
    it("", (done) => {
        chai
            .request(server)
            .post("/spaces")
            .type("json")
            .send({
                name: "twin peaks",
                location: "menzah1",
                userId: "6298f1f080e4903dc898ca92",
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("success");
                done();
            });
    });
});

describe("display the capacity of a workspace and the reserved places  ", () => {
    it("should return an error if the reservation doesn't exist", (done) => {
        chai
            .request(server)
            .post("/reservations/reserv")
            .type("json")
            .send({
                id: "629941d302682b2818f155e8",
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("error").eql("reservation doesn't exist");
                done();
            });
    });

    it("should return a table that contains the capacity of the space and the number of reserved places", (done) => {
        chai
            .request(server)
            .post("/reservations/reserv")
            .type("json")
            .send({
                id: "62993c3e6fa2b93b60b4d01a",
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array");
                done();
            });
    });
});