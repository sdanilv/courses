const express = require("express");
const CourseDAL = require("../DAL/course");

const router = express.Router();

router.get("/courses", (req, res) => {
    CourseDAL.getAllCourses()
        .then(data => {res.send(data);})
});
router.get("/courses/:id", (req, res) => {
    CourseDAL.getCourse(req.params.id)
        .then(data => {res.send(data);})
});

router.put("/courses", (req, res) => {
    CourseDAL.addCourse(req.body)
        .then(data => {
            res.send(data)
        })
});

router.post("/courses/:id/name/", (req, res) => {
    CourseDAL.changeCourseName(req.params.id, req.body.name, res.send.bind(res))
});

router.post("/courses/:id/students/", (req, res) => {
    CourseDAL.addStudentInCourse(req.params.id, req.body.student, res.send.bind(res))
});

router.delete("/courses/:id", (req, res) => {
    CourseDAL.removeCourse(req.params.id)
        .then(data => {
        res.send(data);
    })
});

router.delete("/courses/:courseID/students/:studentID", (req, res) => {
    CourseDAL.removeStudentFromCourse(req.params.courseID, req.params.studentID, res.send.bind(res));
});
module.exports = router;