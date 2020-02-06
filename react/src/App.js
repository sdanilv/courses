import React from 'react';
import './App.css';
import {Route, BrowserRouter} from "react-router-dom"

import Students from "./components/Students/Students";
import Courses from "./components/Courses/Courses";
import Header from "./components/Header/Header";
import Course from "./components/Courses/Course/Course";


function App() {

    return (
        <BrowserRouter>
            <Header />
            <Route exact path="/students" component={Students}/>
            <Route exact path="/courses" component={Courses}/>
            <Route  path="/courses/:id" component={Course}/>
        </BrowserRouter>);
}

export default App;
