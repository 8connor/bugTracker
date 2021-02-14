const express = require("express");
const Tickets = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../Models/index");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
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
    console.log("hit")
    const { project, description, severity } = req.body;

    db.Images.create({project: project}).then(data => console.log(data)).catch(err => console.log(err))

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
    console.log("reaching the route");
    console.log(req.body.projName);
    console.log(req.file.filename);

    db.Projects.findOne({ name: req.body.projName })
        .lean()
        .then(obj => {
            if (obj) {
                db.Images.updateOne(
                    { project: req.body.projName },
                    {
                        $push: {
                            images: {
                                location: `images/${req.file.filename}`
                            }
                        }
                    }
                )
                    .then(data => console.log(data))
                    .catch(err => console.log(err));
            }
            else {
                return
            }
        }).catch(err => console.log(err))
    // Creating a new collection to handle images and their locations.


});


module.exports = Tickets