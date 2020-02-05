import axios from "axios";

export default  {
    getAllStudents: () => axios.get("/api/students").then(res => res.data),
    addStudent: (student) => axios.put("/api/students", student).then(res => res.data),
    changeStudent: (student) => axios.post("/api/students", student).then(res => res.data),
    deleteStudent: (student) => axios.delete("/api/students", student).then(res => res.data)
};