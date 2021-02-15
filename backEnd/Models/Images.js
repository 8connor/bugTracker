const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema(
    {
        project: {
            type: String,
            required: true
        },
        ticketId:{
            type: String,
            required: false
        },
        images: [
            {
                _id: false,
                location: {
                    type: String,
                    required: true
                }
            }
        ]
    }, { versionKey: false }
);

const Images = mongoose.model("Images", ImageSchema);

module.exports = Images