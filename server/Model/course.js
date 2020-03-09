const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const course = new Schema({
    name: {type: String, required: true},
    students: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Student'
            }], default: []
    }
});
module.exports = mongoose.model("Course", course);