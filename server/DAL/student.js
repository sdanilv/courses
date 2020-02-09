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
    removeCourseFromStudent: (studentID, courseID) => Student.findById(studentID,
        (err, student) => {
            student.courses = student.courses.filter(course => course.toString() !== courseID.toString());
            student.save();
        }),
    removeStudent: studentId =>
        Student.deleteOne({_id: studentId})
};

module.exports = StudentDAL;