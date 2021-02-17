const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
    {
        owner: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        members: [
            {
                _id: false,
                name: {
                    type: String,
                    unique: true
                }
            }
        ]
    }, { versionKey: false }
);

const Projects = mongoose.model("Projects", ProjectSchema);

module.exports = Projects