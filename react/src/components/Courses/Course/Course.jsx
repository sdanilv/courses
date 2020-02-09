import React, { useState} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {
    addStudentInCourse,
    removeStudentFromCourse, setCourseName
} from "../../../redux/Courses/CoursesReducer";

import style from "./Course.module.css";
import {withRouter} from "react-router";
import {Button, ListItemText} from "@material-ui/core";
import DeleteIcon from "@material-ui/core/SvgIcon/SvgIcon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import EditNameForm from "./EditNameForm";


const Course = props => {
    const {
         removeStudentFromCourse,
        addStudentInCourse, setCourseName, courses
    } = props;
    const courseId = props.match.params.id;
    const [editable, isEditable] = useState(false);
    const removeStudentHandler = id => () => {
        removeStudentFromCourse(courseId, id)
    };
    const addStudentHandler = addedStudent => () => {
        addStudentInCourse(courseId, addedStudent);
    };

    const course = courses.find(course => course._id === courseId);
//TODO нужен другой подход к поиску других студентов
    const anotherStudents = [];
    props.students.forEach(student => {
        if (student.courses.length === 0) {
            anotherStudents.push(student)
        } else {
            let isNotStudentThisCourse = true;
            student.courses.forEach(course => {
                if (course._id === courseId) isNotStudentThisCourse = false;
            });
            if (isNotStudentThisCourse)
                anotherStudents.push(student);
        }
    });


    const mapStudentsFromThisCourse = course.students.map(({_id, name}) => {
        return <ListItem key={_id}>
            <ListItemText>{name}</ListItemText>
            <ListItemIcon>
                <Button color="secondary" startIcon={<DeleteIcon/>}
                        onClick={removeStudentHandler(_id)}>
                    Delete
                </Button>
            </ListItemIcon>
        </ListItem>

    });
    const mapAnotherStudents = anotherStudents.map(student => {
        return <ListItem key={student._id}>
            <ListItemText>{student.name}</ListItemText>
            <ListItemIcon>
                <Button startIcon={<DeleteIcon/>}
                        onClick={addStudentHandler(student)}>
                    ADD
                </Button>
            </ListItemIcon>
        </ListItem>
    });
    const editNameHandler = formValues => {
        setCourseName(courseId, formValues);
        isEditable(false);
    };
    const editableOn = () => {
        isEditable(true)
    };
    return (
        <div className={style.course}>
            {editable ?
                <EditNameForm onSubmit={editNameHandler} initialValues={{name: course.name}}/> :
                <h1 onDoubleClick={editableOn}>
                    {course.name}
                </h1>
            }
            <h3> Students from this course</h3>
            <List>{mapStudentsFromThisCourse} </List>
            <h3>Another students</h3>
            <List>{mapAnotherStudents} </List>
        </div>)
};
const mapStateToProps = state => ({
    courses: state.Courses.courses,
    students: state.Students.students
});
export default compose(withRouter, connect(mapStateToProps, {
    addStudentInCourse,
    removeStudentFromCourse,
    setCourseName
}))(Course);