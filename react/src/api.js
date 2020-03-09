import axios from "axios";

const axiosStudents = axios.create({baseURL: "/api/students/"});
const axiosCourses = axios.create({baseURL: "/api/courses/"});
const getData = promise => promise.then(res => res.data);
export default {
    getAllStudents: () => getData(axiosStudents.get("")),
    addStudent: (student) => getData(axiosStudents.put("", student)),
    changeStudent: (id, student) => getData(axiosStudents.post(`${id}`, student)),
    deleteStudent: (id) => {
        getData(axiosStudents.delete(`${id}`))
    },

    getAllCourses: () => getData(axiosCourses.get("")),
    addCourse: (course) => getData(axiosCourses.put("", course)),
    changeCourseName: (id, name) => getData(axiosCourses.post(`${id}/name/`, {name})),
    deleteCourse: (id) => getData(axiosCourses.delete(`${id}`).then(res => res.data)),

    addStudentInCourse: (id, student) => getData(axiosCourses.post(`${id}/students/`, {student})),
    removeStudentFromCourse: (courseID, studentID) => getData(axiosCourses.delete(`${courseID}/students/${studentID}`).then(res => res.data))

};