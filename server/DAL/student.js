const Student = require("../Model/student");
const StudentDAL = {
    getAllStudent: () => Student.find({}).populate("courses","name"),
    addStudent: student => Student.create(student),
    changeStudentData: (id, body, callback) => Student.findByIdAndUpdate(id, {...body})
        .then(()=> Student.findById(id)).then(
        (changedStudent)=> callback(changedStudent)),
    addStudentToCurse: (id, courseID) => {
        return Student.findByIdAndUpdate(id, {$push: {courses: courseID}})
            .then(() => Student.findById(id));
    },
    removeCourseFromStudent: (id, courseID) => Student.findById(id,
        (err, student) => {
            console.log(student.courses);
            student.courses = student.courses.filter(course => course.toString() !== courseID.toString());
            student.save();
        }),
    removeStudent: id =>
        Student.deleteOne(id)
            .then(() =>this.getAllStudent())
};

module.exports = StudentDAL;