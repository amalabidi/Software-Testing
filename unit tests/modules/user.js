const mongoose = require("mongoose");

// Creating a user Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 25,
    },
    hashedPassword: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
});

// Creating a model from a Schema

const User = mongoose.model("User", userSchema);

exports.User = User;