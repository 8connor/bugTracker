const express = require("express");
const Projects = express.Router();
const db = require("../Models/index");

// ========= Get routes ============
Projects.get("/users", (req, res) => {
    db.Users.find({}).lean().then(response => res.json(response)).catch(err => console.log(err))
});

// ========= Post routes ============
Projects.post("/addUser", (req, res) => {
    console.log(req.body);

    db.Users
        .create({ name: req.body.name })
        .then(data => {
            res.json(data.name)
        }).catch(err => {
            console.log("user recorded")
        })
});

Projects.post("/searchUsers", (req, res) => {
    console.log(req.body);

    db.Users.find({
        name: { $regex: req.body.name, $options: "i" }
    })
    .lean()
    .then(response => {
        console.log(response);

        res.json(response);
    })
    .catch(err => console.log(err));
});

module.exports = Projects