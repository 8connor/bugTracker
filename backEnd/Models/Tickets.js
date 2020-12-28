const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema(
    {
        project: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        severity: {
            type: String,
            enum: ['Minor', 'Moderate', 'Severe'],
            required: true
        }
    }, { versionKey: false }
);

const Tickets = mongoose.model("Tickets", TicketSchema);

module.exports = Tickets