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

router.post("/courses/name/:id", (req, res) => {
    CourseDAL.changeCourseName(req.params.id, req.body.name, res.send.bind(res))
});

router.post("/courses/students/:id", (req, res) => {
    CourseDAL.addStudentInCourse(req.params.id, req.body.students, res.send.bind(res))
});

router.delete("/courses/:id", (req, res) => {
    CourseDAL.removeCourse(req.params.id)
        .then(data => {
        res.send(data);
    })
});

router.delete("/courses/students/:id", (req, res) => {
    CourseDAL.removeStudentFromCourse(req.params.id, req.body.students[0], res.send.bind(res));
});
module.exports = router;