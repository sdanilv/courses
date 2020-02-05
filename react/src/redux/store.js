import {combineReducers, createStore, applyMiddleware} from "redux";
import Students from "./Students/StudentsReducer"
import thunk from "redux-thunk";
import {reducer as form} from "redux-form"

const store = createStore(combineReducers({Students, form}), applyMiddleware(thunk));
export default store;