const router = require("express").Router();
const { User } = require("../modules/user");
const bcrypt = require("bcrypt");

router.post("/", async(req, res) => {
    const { username, email, hashedPassword } = req.body;
    if (typeof email === "undefined") {
        res.send({ errors: { email: "required" } });
    } else {
        const oldUser = await User.find({ email: email });

        if (oldUser.length != 0) {
            res.send({ errors: "email already exists" });
        } else {
            newUser = new User({ username, email, hashedPassword });
            newUser.save((err, user) => {
                if (err) {
                    res.send(err);
                } else {
                    res.json({ message: "User successfully created", user });
                }
            });
        }
    }
});
/* console.log("hello");

 try {
     console.log("hello", email);
     if (typeof email === "undefined") {
         res.send({ errors: { email: "required" } });
     } else {
         console.log("hellooo");

         const hashedPassword = await bcrypt.hash(password, 10);
         const user = new User({ username, hashedPassword, email });
         console.log("hello", user);
         // Saving the user in the database
         const results = await user.save();
         res.json({ message: "User successfully created", user });
     }
 } catch (ex) {
     res.send(ex);
 }
});*/

router.get("/", async(req, res) => {
    try {
        // Find all Users in the database
        const results = await User.find({});
        res.send(results);
    } catch (ex) {
        res.send(ex);
    }
});

router.delete("/:id", async(req, res) => {
    try {
        const results = await User.findByIdAndDelete(req.params.id).exec();
        res.json({ message: "User deleted", results });
    } catch (err) {
        res.send(err);
    }
});

//  updating a user
router.put("/:id", async(req, res) => {
    try {
        const { username, email } = req.body;

        let olduser = await User.find({ _id: req.params.id });

        if (!olduser) {
            res.send({ error: "user doesn't exist" });
        } else {
            const filter = { _id: req.params.id };

            const update = {
                username,
                email,
            };
            let user = await User.findByIdAndUpdate(filter, update, { new: true });

            res.json({ message: "User updated", user });
        }
    } catch (ex) {
        res.send(ex);
    }
});

module.exports = router;