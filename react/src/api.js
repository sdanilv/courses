import axios from "axios";

const axiosStudents = axios.create({baseURL: "/api/students"});
const axiosCourses = axios.create({baseURL: "/api/courses"});
const getData = promise => promise.then(res => res.data);
export default {
    getAllStudents: () => getData(axiosStudents.get("")),
    addStudent: (student) => getData(axiosStudents.put("", student)),
    changeStudent: (id, student) => axiosStudents.post(`/${id}`, student).then(res => res.data),
    deleteStudent: (id) => axiosStudents.delete(`/${id}`).then(res => res.data),

    getAllCourses: () => getData(axiosCourses.get("")),
    addCourse: (course) => getData(axiosCourses.put("", course)),
    changeCourseName: (id, name) => getData(axiosStudents.post(`/${id}`, name)),
    deleteCourse: (id) => getData(axiosStudents.delete(`/${id}`).then(res => res.data))
};