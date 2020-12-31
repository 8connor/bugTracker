const express = require("express");
const Projects = express.Router();
const db = require("../Models/index");

// ========= Get routes ============
Projects.get("/projects", (req, res) => {
    db.Projects
        .find({})
        .lean()
        .then(data => res.json(data))
        .catch(err => console.log(err))
});
// ========= Post routes ============
Projects.post("/createProj", (req, res) => {
    db.Projects
        .create(req.body)
        .then(data => res.json(data))
        .catch(err => console.log(err))
});

Projects.post("/deleteProj", (req, res) => {
    console.log(req.body);

    db.Projects
        .findOneAndDelete({ _id: req.body._id })
        .then(data => res.json(data))
        .catch(err => console.log(err))
});

Projects.post("/addProjUser", (req, res) => {
    console.log(req.body);

    db.Projects
        .updateOne(
            { _id: req.body._id },
            { $push: { members: { name: req.body.name } } }
        )
        .then(data => {
            console.log(data)
        })
        .catch(err => console.log(err));
});

module.exports = Projects