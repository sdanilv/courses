import React, {useEffect} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {addCourseToServer, getCoursesFromServer, removeCourseFromServer} from "../../../redux/Courses/CoursesReducer";


import {withRouter} from "react-router";


const Course = props => {
    console.log(props);
    const {getCoursesFromServer, courses} = props;
    // const submit = (formValues) => {
    //     props.addCourseToServer({...formValues})
    // };

    useEffect(() => {
            getCoursesFromServer();
    }, [getCoursesFromServer]);

    // const removeCourseHandler = id => () => {
    //     props.removeCourseFromServer(id);
    // };


    const course = courses.find(course => course._id === props.match.params.id);
    const mapStudents =course && course.students.map(student => <div>{student.name}</div>);

    return (
        <div>
            <div> {course &&course.name}</div>
            <div> Students:</div>
            {mapStudents || <div>No students yet</div>}
        </div>)
};
const mapStateToProps = state => ({
    courses: state.Courses.courses
});
export default compose(withRouter, connect(mapStateToProps, {
    getCoursesFromServer,
    addCourseToServer,
    removeCourseFromServer
}))(Course);