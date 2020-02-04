const express = require("express");
const StudentDAL = require("../DAL/student");
const router = express.Router();

router.get("/students", (req, res) => {
    StudentDAL.getAllStudent()
        .then(data => {
            res.send(data);
        })
});

router.put("/students", (req, res) => {

    StudentDAL.addStudent(req.body)
        .then(data => {
            res.send(data)
        })
});

router.post("/students/:id", (req, res) => {
  StudentDAL.changeStudentData(req.params.id, req.body, res.send.bind(res));
});

router.delete("/students/:id", (req, res) => {
    StudentDAL.removeStudent(req.params.id)
        .then(data => {
            res.send(data);
        })
});


module.exports = router;