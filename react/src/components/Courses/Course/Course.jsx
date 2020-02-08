import React, {useEffect} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {
    addCourseToServer,
    addStudentInCourse,
    getCoursesFromServer,
    removeCourseFromServer, removeStudentFromCourse
} from "../../../redux/Courses/CoursesReducer";


import {withRouter} from "react-router";
import GenerateTable from "../../FormTools/GenerateTable";
import {Button, Icon, IconButton, TableCell, TableRow} from "@material-ui/core";
import {Link} from "react-router-dom";
import DeleteIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {getStudentFromServer} from "../../../redux/Students/StudentsReducer";


const Course = props => {
    console.log(props);

    const {getCoursesFromServer, getStudentFromServer, removeStudentFromCourse, addStudentInCourse,  courses} = props;
    const courseId = props.match.params.id;

    useEffect(() => {
        getCoursesFromServer();
        getStudentFromServer();
    }, [getCoursesFromServer, getStudentFromServer]);

    const removeStudentHandler = id => () => {
        removeStudentFromCourse(courseId, id)
    };
    const addStudentHandler = student  => () => {
        addStudentInCourse(courseId, student);
    };
    const course = courses.find(course => course._id === courseId);

    const anotherStudents = [];
    props.students.forEach(student => {
        if (student.courses.length === 0) {
            anotherStudents.push(student)
        } else
            student.courses.forEach(course => {
                if (course._id !== courseId) anotherStudents.push(student);
            })
    });
    const mapStudentsFomThisCourse = course && course.students.map(({_id, name}) => {
        return <TableRow key={_id}>
            <TableCell><Link to={`/students/${_id}`}>{name}</Link></TableCell>

            <TableCell><Button color="secondary" startIcon={<DeleteIcon/>}
                               onClick={removeStudentHandler(_id)}>
                Delete</Button></TableCell>
        </TableRow>
    });
    const mapAnotherStudents = anotherStudents && anotherStudents.map(student => {
        return <TableRow key={student._id}>
            <TableCell><Link to={`/students/${student._id}`}>{student.name}</Link></TableCell>
            <TableCell> <IconButton size="small" onClick={addStudentHandler(student)}>
                <Icon>add_circle</Icon></IconButton>
            </TableCell>

        </TableRow>
    });

    return (
        <div>
            <h1>
               {course && course.name}
            </h1>
            <GenerateTable body={mapStudentsFomThisCourse} columnsNames={["Name", "Action"]}/>
            <GenerateTable body={mapAnotherStudents} columnsNames={["Name", "Action"]}/>

        </div>)
};
const mapStateToProps = state => ({
    courses: state.Courses.courses,
    students: state.Students.students
});
export default compose(withRouter, connect(mapStateToProps, {
    getCoursesFromServer,
    getStudentFromServer,
    addStudentInCourse,
    removeStudentFromCourse
}))(Course);