const express = require("express");
const Users = express.Router();
const db = require("../Models/index");

// ========= Get routes ============
Users.get("/users", (req, res) => {
    db.Users.find({}).lean().then(response => res.json(response)).catch(err => console.log(err))
});

// ========= Post routes ============
Users.post("/addUser", (req, res) => {
    db.Users
        .findOne({ name: req.body.name })
        .lean()
        .then(data => {
            console.log(data);

            if (data) {
                return
            } else {
                db.Users
                    .create({ name: req.body.name })
                    .then(data => {
                        res.json(data.name)
                    }).catch(err => {
                        console.log("user recorded")
                    })
            }
        }).catch(err => console.log(err))


});

Users.post("/searchUsers", (req, res) => {
    console.log(req.body);

    if (req.body.name === "" || req.body.name === " ") {
        return
    };

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