const express = require("express");
const Tickets = express.Router();
const db = require("../Models/index");

// ========= Get routes ============
Tickets.get("/tickets", (req, res) => {
    db.Tickets
        .find({})
        .lean()
        .then(response => {
            console.log(response);
            res.json(response);
        })
        .catch(err => console.log(err))
});

// ========= Post routes ============

Tickets.post("/makeTicket", (req, res) => {
    const { project, description, severity } = req.body

    db.Tickets
        .create({
            project: project,
            description: description,
            severity: severity
        })
        .then(response => res.json(response))
        .catch(err => console.log(err))
});


module.exports = Tickets