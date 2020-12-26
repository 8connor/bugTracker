const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        }
    }, { versionKey: false }
);

const Users = mongoose.model("Users", UserSchema);

module.exports = Users