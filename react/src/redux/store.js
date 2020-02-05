import {combineReducers, createStore, applyMiddleware} from "redux";
import Students from "./Students/StudentsReducer"
import Courses from "./Courses/CoursesReducer"
import thunk from "redux-thunk";
import {reducer as form} from "redux-form"

const store = createStore(combineReducers({Students,Courses, form}), applyMiddleware(thunk));
export default store;