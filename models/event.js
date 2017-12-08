const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const entrySchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    location: {
        type: String,
        required: [true, "Location is required"]
    },
    start: {
        type: Number,
        required: [true, "You must chose a date"]
    },
    description: {
        type: String,
        required: [true, "Content is required"]
    },
    date: {
        type: Date,
        default: Date.now
    },
    assistants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    maxAssisntants: {
        type: Number,
        required: [true, "Must choose the maxium assisntants"]
    }
});

module.exports = mongoose.model("Event", entrySchema);