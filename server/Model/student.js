const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const student = new Schema({
    name: {type: String, required: true},
    telephone: {type: String, required: true},
    email: {type: String, required: true},
    courses: {
        type: [{type: Schema.Types.ObjectId, ref: "Course"}],
        default: []
    }
});
module.exports = mongoose.model("Student", student);