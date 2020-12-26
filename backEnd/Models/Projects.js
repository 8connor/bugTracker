const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        }
    }, { versionKey: false }
);

const Projects = mongoose.model("Projects", ProjectSchema);

module.exports = Projects