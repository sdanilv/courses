import api from "../../api";

const SET_COURSES = "SET_COURSES";
const ADD_COURSE = "ADD_COURSE";
// const CHANGE_COURSE = "CHANGE_COURSE";
const DELETE_COURSE = "DELETE_COURSE";
const ADD_STUDENT_TO_COURSE = "ADD_STUDENT_TO_COURSE";
const REMOVE_STUDENT_FROM_COURSE = "REMOVE_STUDENT_FROM_COURSE";

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
            return {...store, courses: store.courses.filter(courses => courses._id !== action.id)};
        case ADD_STUDENT_TO_COURSE:
            return {
                ...store,
                courses: [...store.courses,
                    store.courses.find(course => course._id === action.id)
                        .students.push(action.student)]
            };
        case REMOVE_STUDENT_FROM_COURSE:
            const course = store.courses.find(course => course._id === action.courseID);
            return {
                ...store,
                courses: [...store.courses,
                    course.students = course.students.filter(student => student._id !== action.studentID)]
            };
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


const addCourses = (course) => ({type: ADD_COURSE, course});
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
const addStudentInCourseAC = (id, student) => ({type: ADD_STUDENT_TO_COURSE, id, student});

export const addStudentInCourse = (id, student) => dispatch => {
    api.addStudentInCourse(id, student).then(() => {
        dispatch(addStudentInCourseAC(id, student));
    })
};

const removeStudentFromCourseAC = (courseID, studentID) => ({type: REMOVE_STUDENT_FROM_COURSE, courseID, studentID});
export const removeStudentFromCourse = (courseID, studentID) => dispatch => {
    api.removeStudentFromCourse(courseID, studentID).then(() => {
        dispatch(removeStudentFromCourseAC(courseID, studentID));
    })
};

export default CoursesReducer;
