const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/users");
const projects = require("./routes/projects");
const collaborators = require("./routes/collaborators");
const login = require("./routes/authentification");
const app = express();
let bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

// connecting to mongodb

/*'mongodb+srv://flutter-team:flutter-junior@cluster0.o7rlv.mongodb.net/flutter_ecommerce_project' */
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
mongoose
    .connect(
        `mongodb+srv://***:**@cluster0.a2ly8.mongodb.net/test`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("connected to mongodb successfully"))
    .catch((err) => console.log("couldnt connect to mongodb" + err));

//delegating a router to a given url
// all request to /api/categories will be handled by the categories router

app.use("/users", users);
app.use("/projects", projects);
app.use("/collab", collaborators);
app.use("/login", login);
//choose the backend port
const port = process.env.PORT || 3001;

//starting the backend server
app.listen(port, () => console.log("listening on port:" + port));
module.exports = app;