import React, {useEffect, useState} from 'react';
import './App.css';
import {Route, BrowserRouter} from "react-router-dom"

import Students from "./components/Students/Students";
import Courses from "./components/Courses/Courses";
import Header from "./components/Header/Header";
import Course from "./components/Courses/Course/Course";
import {getCoursesFromServer} from "./redux/Courses/CoursesReducer";
import {getStudentFromServer} from "./redux/Students/StudentsReducer";
import {connect} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";


function App({getCoursesFromServer, getStudentFromServer}) {
    const [loading, isLoading] = useState(true);
    useEffect(() => {
        getCoursesFromServer().then(() => getStudentFromServer().then(isLoading(false)));
    }, [getCoursesFromServer, getStudentFromServer]);
    return (
        <BrowserRouter>
            <Header/>
            {loading ? <CircularProgress/> : <>
                <Route exact path="/students" component={Students}/>
                <Route exact path="/courses" component={Courses}/>
                <Route path="/courses/:id" component={Course}/></>}
        </BrowserRouter>);
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps, {getCoursesFromServer, getStudentFromServer})(App);
