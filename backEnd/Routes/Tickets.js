const express = require("express");
const Tickets = express.Router();
const db = require("../Models/index");

// ========= Get routes ============
Tickets.get("/tickets", (req, res) => {
    db.Tickets.find({}).lean().then(response => res.json(response)).catch(err => console.log(err))
});

// ========= Post routes ============


module.exports = Tickets