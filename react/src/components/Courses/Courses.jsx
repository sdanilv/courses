import React from "react";
import {connect} from "react-redux";
import {addCourseToServer,  removeCourseFromServer} from "../../redux/Courses/CoursesReducer";
import AddCourseForm from "../FormTools/AddCourseForm";
// import style from "./Courses.module.css"
import {Button, TableCell, TableRow} from '@material-ui/core'
import GenerateTable from "../FormTools/GenerateTable";
import DeleteIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {Link} from "react-router-dom";


const Courses = props => {
    const submit = (formValues) => {
        props.addCourseToServer({...formValues})
    };

    const removeCourseHandler = id => () => {
        props.removeCourseFromServer(id);
    };


    const courses = props.courses.map(({_id, students, name}) => {
        return <TableRow  key={_id}>
            <TableCell><Link to={`/courses/${_id}`}>{name}</Link></TableCell>
            <TableCell >{students.length}</TableCell>
            <TableCell><Button color="secondary" startIcon={<DeleteIcon/>}
                               onClick={removeCourseHandler(_id)}>
                Delete</Button></TableCell>
            <TableCell >{_id}</TableCell>

        </TableRow>
    });

    return <div>
        <AddCourseForm onSubmit = {submit}/>
        <GenerateTable body={courses} columnsNames={["Name", "Students count", "Action", "ID"]}/>
    </div>
};
const mapStateToProps = state => ({
    courses: state.Courses.courses
});
export default connect(mapStateToProps, { addCourseToServer, removeCourseFromServer})(Courses);