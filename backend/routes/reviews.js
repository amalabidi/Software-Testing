var express = require("express");
var router = express.Router();
var { Review } = require("../models/Review");
var { Space } = require("../models/Space");
router.post("/addReview", async(req, res) => {
    try {
        const { name, email, rating, review, workspace } = req.body;
        const data = new Review({
            name: name,
            email: email,
            rating: rating,
            review: review,
            workspace: workspace,
        });

        var space = await Space.findOne({ _id: workspace });

        var spaceUpdated = await Space.findByIdAndUpdate({ _id: workspace }, {
            sumClient: 1,
            sumRating: 1,
            rating: 1,
        });

        var rev = await data.save();
        res.send({ response: "done" });
    } catch (e) {
        res.status(404).json(e);
    }
});
router.get("/", async(req, res) => {
    try {
        const reviews = await Review.find();
        res.send(reviews);
    } catch (e) {
        res.status(404).json(e);
    }
});
router.get("/:spaceId", async(req, res) => {
    try {
        const { spaceId } = req.params;
        const reviews = await Review.find({ workspace: { $in: spaceId } });
        res.send(reviews);
    } catch (e) {
        res.status(404).json(e);
    }
});
module.exports = router;