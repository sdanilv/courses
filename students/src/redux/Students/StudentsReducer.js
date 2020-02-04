import api from "../../api";

const SET_STUDENTS = "SET_STUDENTS";
const ADD_STUDENT = "ADD_STUDENT";
// const CHANGE_STUDENT = "CHANGE_STUDENT";
// const DELETE_STUDENT = "DELETE_STUDENT";


const initStore = {
    students: []
};

const StudentsReducer = (store = initStore, action) => {
    switch (action.type) {
        case SET_STUDENTS:
            return {...store, students: action.students};
        case ADD_STUDENT:
            return {...store, students: [...store.students, action.student]};
        default:
            return store;
    }
};

const setStudents = (students) => ({type: SET_STUDENTS, students});

export const getStudentFromServer = () => dispatch => {
    api.getAllStudents().then(students => {
        dispatch(setStudents(students));
    })
};


const addStudent= (student) => ({type: ADD_STUDENT, student});

export const addStudentToServer = (student) => dispatch => {
    api.addStudent(student).then(student => {
        dispatch(addStudent(student));
    })
};


export default StudentsReducer;
