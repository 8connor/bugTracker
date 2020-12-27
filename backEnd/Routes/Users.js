const express = require("express");
const Users = express.Router();
const db = require("../Models/index");

// ========= Get routes ============
Users.get("/users", (req, res) => {
    db.Users.find({}).lean().then(response => res.json(response)).catch(err => console.log(err))
});

// ========= Post routes ============
Users.post("/addUser", (req, res) => {
    console.log(req.body);

    db.Users
        .create({ name: req.body.name })
        .then(data => {
            res.json(data.name)
        }).catch(err => {
            console.log("user recorded")
        })
});

Users.post("/searchUsers", (req, res) => {
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

module.exports = Users