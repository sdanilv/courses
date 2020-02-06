import React, {useEffect} from "react";
import {connect} from "react-redux";
import {addCourseToServer, getCoursesFromServer, removeCourseFromServer} from "../../redux/Courses/CoursesReducer";
import AddCourseForm from "../FormTools/AddCourseForm";
// import style from "./Courses.module.css"
import {Button, TableCell, TableRow} from '@material-ui/core'
import GenerateTable from "../FormTools/GenerateTable";
import DeleteIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {Link} from "react-router-dom";


const Courses = props => {
    const {getCoursesFromServer} = props;
    const submit = (formValues) => {
        props.addCourseToServer({...formValues})
    };

    useEffect(() => {
        getCoursesFromServer();
    }, [getCoursesFromServer]);

    const removeCourseHandler = id => () => {
        props.removeCourseFromServer(id);
    };


    const courses = props.courses.map(({_id, students, name}) => {
        return <TableRow key={_id}>
            <TableCell><Link to={`/courses/${_id}`}>{name}</Link></TableCell>
            <TableCell >{students.length}</TableCell>
            <TableCell >{_id}</TableCell>
            <TableCell><Button color="secondary" startIcon={<DeleteIcon/>}
                               onClick={removeCourseHandler(_id)}>
                Delete</Button></TableCell>

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
export default connect(mapStateToProps, {getCoursesFromServer, addCourseToServer, removeCourseFromServer})(Courses);