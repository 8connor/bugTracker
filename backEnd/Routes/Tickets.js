const express = require("express");
const Tickets = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../Models/index");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../images');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

// ========= Get routes ============
Tickets.get("/tickets", (req, res) => {
    db.Tickets
        .find({})
        .lean()
        .then(response => res.json(response))
        .catch(err => console.log(err))
});

// ========= Post routes ============

Tickets.post("/makeTicket", (req, res) => {
    const { project, description, severity } = req.body;

    db.Tickets
        .create({
            project: project,
            description: description,
            severity: severity
        })
        .then(response => res.json(response))
        .catch(err => console.log(err))
});

//Upload route
Tickets.post('/upload', upload.single('image'), (req, res, next) => {
    try {
        return res.status(201).json({
            message: 'File uploded successfully'
        });
    } catch (error) {
        console.error(error);
    }
});


module.exports = Tickets