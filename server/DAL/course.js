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

                if (!course.students.find(({_id}) => _id.toString() === student._id)) {

                    StudentDAL.addStudentToCurse(student, _id);
                    course.students.push(student);
                    course.save((err, data) => {
                        callback({data});
                    });
                }
            }),
    removeStudentFromCourse: (courseID, studentID, callback) =>
        Course.findById({_id: courseID},
            (err, course) => {
                StudentDAL.removeCourseFromStudent(studentID, courseID);
                course.students = course.students.filter(stud => stud.toString() !== studentID.toString());
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