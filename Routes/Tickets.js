const express = require("express");
const Tickets = express.Router();
const multer = require("multer");
const db = require("../Models/index");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// ========= Get routes ============
Tickets.get("/tickets", (req, res) => {
    db.Tickets.find({})
        .lean()
        .then((response) => res.json(response))
        .catch((err) => console.log(err));
});

// ========= Post routes ============

Tickets.post("/makeTicket", (req, res) => {
    const { project, description, severity } = req.body;

    db.Tickets.create({
        project: project,
        description: description,
        severity: severity,
    })
        .then((response) => res.json(response))
        .catch((err) => console.log(err));
});

Tickets.post("/ticketPics", (req, res) => {
    console.log(req.body);

    db.Images.findOne({ ticketId: req.body.ticket._id })
        .lean()
        .then(data => {
            console.log(data)
            res.json(data.images)
        })
})

//Upload route
Tickets.post("/upload", upload.array("images", 10), (req, res, next) => {
    console.log("reaching the route");
    // console.log(req.body.projName);
    console.log(req.body.ticketId);
    console.log(req.files);

    var images = req.files.map((item, i) => {
        return { location: encodeURI(`/images/${item.filename}`) }
    })

    db.Projects.findOne({ name: req.body.projName })
        .lean()
        .then((obj) => {
            if (obj) {
                console.log(obj)
                db.Images.create(
                    {
                        project: req.body.projName,
                        ticketId: req.body.ticketId,
                        images: images,
                    }
                )
                    .then((data) => console.log(data))
                    .catch((err) => console.log(err));
            } else {
                return;
            }
        })
        .catch((err) => console.log(err));
    // Creating a new collection to handle images and their locations.
});

Tickets.post("/resolveTicket", (req, res) => {
    db.Tickets
        .findOneAndDelete({ _id: req.body._id })
        .then(data => {
            console.log(data);
            db.Images
                .findOneAndDelete({
                    ticketId: req.body._id
                }).then(dataOne => {
                    console.log(dataOne)
                    res.json(dataOne)
                }).catch(err => console.log(err));
        }).catch(err => console.log(err));
})

module.exports = Tickets;
