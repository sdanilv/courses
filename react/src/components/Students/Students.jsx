import React, {useEffect} from "react";
import {connect} from "react-redux";
import {addStudentToServer, getStudentFromServer} from "../../redux/Students/StudentsReducer";
import AddStudentForm from "../FormTools/AddStudentForm";
import {reset} from "redux-form";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import GenerateTable from "../FormTools/GenerateTable";

const Students = props => {
    const {getStudentFromServer} = props;
    const submit = (formValues) => {
        props.addStudentToServer({...formValues});
        props.reset("addForm")
    };

    useEffect(() => {
        getStudentFromServer();
    }, [getStudentFromServer]);


    const students = props.students.map(student => {
        return <TableRow key={student._id}>
            <TableCell>{student.name}</TableCell>
            <TableCell>{student.telephone}</TableCell>
            <TableCell>{student.email}</TableCell>
            <TableCell>{student._id}</TableCell>
        </TableRow>
    });

    return <div>
        <AddStudentForm onSubmit={submit}/>
        <GenerateTable body={students} columnsNames={["Name", "Telephone", "Email", "Action"]}/>
    </div>
};
const mapStateToProps = state => ({
    students: state.Students.students
});
export default connect(mapStateToProps, {getStudentFromServer, addStudentToServer ,reset})(Students);