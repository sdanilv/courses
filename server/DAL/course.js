const Course = require("../Model/course");
const StudentDAL = require("./student");
const CourseDAL = {
    getAllCourses: () => Course.find({}).populate("students", "name"),
    getCourse: (id) => Course.findById(id),
    addCourse: course => Course.create(course),
    changeCourseName: (_id, name, callback) => Course.findByIdAndUpdate({_id}, {name},
        (err, data) => callback(data)),
    addStudentInCourse: (_id, student, callback) =>
        Course.findById({_id},
            (err, course) => {
                StudentDAL.addStudentToCurse(student[0], _id);
                course.students.push(student[0]);
                course.save((err, data) => {
                    callback({data});
                });
            }),
    removeStudentFromCourse: (_id, student, callback) =>
        Course.findById({_id},
            (err, course) => {
                StudentDAL.removeCourseFromStudent(student, _id);
                course.students = course.students.filter(stud => stud.toString() !== student.toString());
                course.save((err, data) => {
                    callback(data);
                });
            }),
    removeCourse: courseId =>
        Course.deleteOne({_id: courseId})
            .then(() => Course.find({}))
};

module.exports = CourseDAL;
// module.exports = CourseDAL.addStudentInCurse;