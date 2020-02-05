import React, {useEffect} from "react";
import {connect} from "react-redux";
import {addCourseToServer, getCoursesFromServer} from "../../redux/Courses/CoursesReducer";
import AddCourseForm from "../FormTools/AddCourseForm";
// import style from "./Courses.module.css"
import {TableCell, TableRow} from  '@material-ui/core'
import GenerateTable from "../FormTools/GenerateTable";


const Courses = props => {
    const {getCoursesFromServer} = props;
    const submit = (formValues) => {
        props.addCourseToServer({...formValues})
    };

    useEffect(() => {
        getCoursesFromServer();
    }, [getCoursesFromServer]);


    const courses = props.courses.map(course => {
        return <TableRow key={course._id}>
            <TableCell >{course.name}</TableCell>
            <TableCell >{course.students.length}</TableCell>
            <TableCell >{course._id}</TableCell>
            <TableCell >{course._id}</TableCell>

        </TableRow>
    });

    return <div>
        <AddCourseForm onSubmit = {submit}/>
        <GenerateTable body={courses} columnsNames={["Name", "Students count", "ID", "Action"]}/>
    </div>
};
const mapStateToProps = state => ({
    courses: state.Courses.courses
});
export default connect(mapStateToProps, {getCoursesFromServer, addCourseToServer})(Courses);