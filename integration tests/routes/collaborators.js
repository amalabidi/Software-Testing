const router = require("express").Router();
const { Project } = require("../modules/project");
const { User } = require("../modules/user");
router.get("/:id", async(req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            res.send({ error: "project non existent" });
        } else {
            var resultArray = await User.find({
                _id: { $in: project.collaborators },
            });

            res.send({ result: resultArray });
        }
    } catch (ex) {
        res.send(ex);
    }
});
router.post("/", async(req, res) => {
    const { projectId, idLeader, userid } = req.body;

    try {
        const proj = await Project.findById(projectId);
        if (!proj) {
            res.send({ error: "project doesn't exist" });
        } else {
            const found = proj.collaborators.indexOf(userid);

            if (proj.leaderId === idLeader) {
                if (found == -1) {
                    var result = await Project.updateOne({ _id: projectId }, { $push: { collaborators: userid } });

                    res.send({ success: "done" });
                } else {
                    res.send({ error: "user already exists" });
                }
            } else {
                res.send({ error: "you don't have the permission to add this user" });
            }
        }
    } catch (ex) {
        res.send(ex);
    }
});

router.delete("/", async(req, res) => {
    const { projectId, idLeader, id } = req.body;

    try {
        const proj = await Project.findById(projectId);
        if (proj.leaderId === idLeader) {
            const results = await Project.findByIdAndUpdate({ _id: projectId }, { $pull: { collaborators: id } });
            res.send(results);
            console.log(proj);
        } else {
            res.send("you don't have the permission to delete this user");
        }
    } catch (ex) {
        res.send(ex);
    }
});

module.exports = router;