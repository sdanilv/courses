import api from "../../api";

const SET_COURSES = "SET_COURSES";
const ADD_COURSE = "ADD_COURSE";
// const CHANGE_COURSE = "CHANGE_COURSE";
const DELETE_COURSE = "DELETE_COURSE";


const initStore = {
    courses: []
};

const CoursesReducer = (store = initStore, action) => {
    switch (action.type) {
        case SET_COURSES:
            return {...store, courses: action.courses};
        case ADD_COURSE:
            return {...store, courses: [...store.courses, action.course]};
        case DELETE_COURSE:
            return {...store, students: store.students.filter(student => student._id !== action.id)};
        default:
            return store;
    }
};

const setCourses = (courses) => ({type: SET_COURSES, courses});

export const getCoursesFromServer = () => dispatch => {
    api.getAllCourses().then(courses => {
        dispatch(setCourses(courses));
    })
};



const addCourses= (course) => ({type: ADD_COURSE, course});

export const addCourseToServer = (course) => dispatch => {
    api.addCourse(course).then(course => {
        dispatch(addCourses(course));
    })
};

const removeCourse = (id) => ({type: DELETE_COURSE, id});

export const removeCourseFromServer = (id) => dispatch => {
    api.deleteCourse(id).then(() => {
        dispatch(removeCourse(id));
    })
};


export default CoursesReducer;
