const router = require("express").Router();
const { User } = require("../modules/user");
const bcrypt = require("bcrypt");
const { Project } = require("../modules/project");
router.post("/", async(req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            res.send({ error: "invalid mail or password" });
        } else {
            const projects = await Project.find({});
            if (req.body.password == user.hashedPassword) {
                res.send({ success: "you are in ! ", user: user, projects: projects });
            } else {
                res.send({ error: "invalid mail or password" });
            }
        }
    } catch (e) {
        console.log(e);
        res.send(e);
    }
});
module.exports = router;