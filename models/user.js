const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const entrySchema = new Schema({
    userId: {
        type: String,
        required: [true, "User name is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    email: {
        type: String,
        required: [true, "E-Mail is required"]
    }

});

module.exports = mongoose.model("Event", entrySchema);