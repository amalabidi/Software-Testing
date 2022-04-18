const router = require("express").Router();
const { Project } = require("../modules/project");

router.post("/", async(req, res) => {
    const { name, description, leaderId /*,collaborators,tasks*/ } = req.body;
    console.log("hello");
    try {
        console.log("hello2");

        const collaborators = [String];
        collaborators[0] = leaderId;
        const project = new Project({
            name,
            description,
            leaderId,
            collaborators /*,tasks*/ ,
        });

        console.log("hello3");
        const results = await project.save();
        console.log("hello4");
        res.send(results);
    } catch (ex) {
        res.send(ex);
    }
});
router.get("/", async(req, res) => {
    try {
        const results = await Project.find({});
        res.send(results);
    } catch (ex) {
        res.send(ex);
    }
});
router.get("/:idleader", async(req, res) => {
    try {
        let array = [];

        const projects = await Project.find({});

        if (projects.length == 0) {
            con;
            res.send({ errors: "you don't have any project yet" });
        } else {
            for (
                var counter = 0; counter < projects[counter].collaborators.length; counter++
            ) {
                const found = projects[counter].collaborators.indexOf(
                    req.params.idleader
                );
                console.log(found);
                if (found != -1) {
                    array.push(projects[counter]);
                    res.send({ results: array });
                } else {
                    res.send({ errors: "you don't have any project yet" });
                }
            }
        }
    } catch (ex) {
        res.send(ex);
    }
});

router.delete("/:id", async(req, res) => {
    const { idLeader } = req.body;

    try {
        const proj = await Project.findById(req.params.id);
        if (proj.leaderId === idLeader) {
            console.log("aa");
            const results = await Project.findByIdAndDelete(req.params.id).exec();
            console.log("bb");
            res.send(results);
        } else {
            res.send("you don't have the permission to delete this project");
        }
    } catch (err) {
        res.send(err);
    }
});
router.put("/", async(req, res) => {
    try {
        const { name, description, idLeader } = req.body;
        const filter = { _id: req.body.id };

        const update = {
            name,
            description,
        };
        console.log("111");
        const proj = await Project.findById(req.body.id);
        console.log("2222");
        if (proj.leaderId === idLeader) {
            console.log("333");
            let project = await Project.findByIdAndUpdate(filter, update, {
                new: true,
            });
            console.log("444");
            res.send(project);
        }
    } catch (ex) {
        res.send(ex);
    }
});
//making search functionality
router.get("/search/:search", async(req, res) => {
    const { search } = req.params;
    console.log(search);
    if (search) {
        const projects = await Project.find({
            name: { $regex: search, $options: "i" },
        });
        res.send(projects);
    } else {
        res.send("no project");
    }
});

module.exports = router;