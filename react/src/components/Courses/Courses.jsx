import React from "react";
import {connect} from "react-redux";
import {addCourseToServer, setCourseName, removeCourseFromServer} from "../../redux/Courses/CoursesReducer";
import {Link} from "react-router-dom";
import MyMaterialTable from "../FormTools/MyMaterialTable";


const Courses = props => {
    const submit = (formValues) => {
        props.addCourseToServer({...formValues})
    };


    const columns = [{
        title: 'Name',
        field: 'name',
        render: rowData => <Link
            style={{textDecoration: "none"}}
            to={`/courses/${rowData._id}`}>{rowData.name}</Link>
    },
        {title: 'Students count', field: 'students.length', editable: 'never'},
        {title: 'ID', field: '_id', editable: 'never'}];

    // const courses = props.courses.map(({_id, students, name}) => {
    //     return <TableRow  key={_id}>
    //         <TableCell><Link to={`/courses/${_id}`}>{name}</Link></TableCell>
    //         <TableCell >{students.length}</TableCell>
    //         <TableCell><Button color="secondary" startIcon={<DeleteIcon/>}
    //                            onClick={removeCourseHandler(_id)}>
    //             Delete</Button></TableCell>
    //         <TableCell >{_id}</TableCell>
    //
    //     </TableRow>
    // });

    // return <div>
    //     <AddCourseForm onSubmit = {submit}/>
    //     <GenerateTable body={courses} columnsNames={["Name", "Students count", "Action", "ID"]}/>
    // </div>

    return <div>
        <MyMaterialTable data={props.courses} columns={columns} changeData={props.setCourseName}
                         removeData={props.removeCourseFromServer} addData={props.addCourseToServer}/>
    </div>
};
const mapStateToProps = state => ({
    courses: state.Courses.courses
});
export default connect(mapStateToProps, {addCourseToServer, setCourseName, removeCourseFromServer})(Courses);