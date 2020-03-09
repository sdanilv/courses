import api from "../../api";

const SET_STUDENTS = "SET_STUDENTS";
const ADD_STUDENT = "ADD_STUDENT";
const DELETE_STUDENT = "DELETE_STUDENT";


const initStore = {
    students: []
};

const StudentsReducer = (store = initStore, action) => {
    switch (action.type) {
        case SET_STUDENTS:
            return {...store, students: action.students};
        case ADD_STUDENT:
            return {...store, students: [...store.students, action.student]};
        case DELETE_STUDENT:
            return {...store, students: store.students.filter(student => student._id !== action.id)};
        default:
            return store;
    }
};

const setStudents = (students) => ({type: SET_STUDENTS, students});

export const getStudentFromServer = () => dispatch => {
   return api.getAllStudents().then(students => {
        dispatch(setStudents(students));
    })
};


const addStudent = (student) => ({type: ADD_STUDENT, student});

export const addStudentToServer = (student) => dispatch => {
    api.addStudent(student).then(student => {
        dispatch(addStudent(student));
    })
};


export const changeStudentInServer = (student) => dispatch => {
    api.changeStudent(student._id, student).then(() => {
        dispatch(getStudentFromServer());
    })
};

const removeStudent = (id) => ({type: DELETE_STUDENT, id});

export const removeStudentFromServer = id => dispatch => {
    api.deleteStudent(id).then(() => {
        dispatch(removeStudent(id));
    })
};


export default StudentsReducer;
