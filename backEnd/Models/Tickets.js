const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema(
    {
        project: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        severity: {
            type: String,
            required: true
        }
    }, { versionKey: false }
);

const Tickets = mongoose.model("Tickets", TicketSchema);

module.exports = Tickets