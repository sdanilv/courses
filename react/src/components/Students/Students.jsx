import React, {useEffect} from "react";
import {connect} from "react-redux";
import {addStudentToServer, getStudentFromServer, removeStudentFromServer} from "../../redux/Students/StudentsReducer";
import AddStudentForm from "../FormTools/AddStudentForm";
import {reset} from "redux-form";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import GenerateTable from "../FormTools/GenerateTable";
import {Button} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete"

const Students = props => {
    const {getStudentFromServer} = props;
    const submit = (formValues) => {
        props.addStudentToServer({...formValues});
        props.reset("addForm")
    };
    const removeStudentHandler = id => () =>{
        props.removeStudentFromServer(id);
    };

    useEffect(() => {
        getStudentFromServer();
    }, [getStudentFromServer]);


    const students = props.students.map(student => {
        return <TableRow key={student._id}>
            <TableCell>{student.name}</TableCell>
            <TableCell>{student.telephone}</TableCell>
            <TableCell>{student.email}</TableCell>
            <TableCell><Button  color="secondary" startIcon={<DeleteIcon />} onClick={removeStudentHandler(student._id)}>Delete</Button></TableCell>
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
export default connect(mapStateToProps, {getStudentFromServer, addStudentToServer, removeStudentFromServer ,reset})(Students);