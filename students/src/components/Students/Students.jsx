import React, {useEffect} from "react";
import {connect} from "react-redux";
import {addStudentToServer, getStudentFromServer} from "../../redux/Students/StudentsReducer";
import AddStudentForm from "../AddStudentForm/AddStudentForm";

const Students = props => {
    const {getStudentFromServer}  = props;
    console.log(props);
    useEffect(() => {
        getStudentFromServer();
    }, [getStudentFromServer]);
    const submit = (formValues)=>{

props.addStudentToServer({...formValues})
    };

    const students = props.students.map(student => {
        return <div key={student._id}>
            <div>Name: {student.name}</div>
            <div> Age: {student.age}</div>
            <div> averageMark: {student.averageMark}</div>
        </div>
    });

    return <div>
        <AddStudentForm onSubmit = {submit}/>
        {students}
    </div>
};
const mapStateToProps = state => ({
    students: state.Students.students
});
export default connect(mapStateToProps, {getStudentFromServer, addStudentToServer})(Students);