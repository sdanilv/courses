import React from "react";
import {connect} from "react-redux";
import {addStudentToServer,  removeStudentFromServer, changeStudentInServer} from "../../redux/Students/StudentsReducer";
import {reset} from "redux-form";
import MyMaterialTable from "../FormTools/MyMaterialTable";

const Students = props => {

    const columns = [{ title: 'Name', field: 'name' },
        { title: 'Telephone', field: 'telephone' },
        { title: 'Email', field: 'email' }];

    return <div>
        <MyMaterialTable data = {props.students} columns={columns} changeData={props.changeStudentInServer}
                         removeData = {props.removeStudentFromServer} addData = {props.addStudentToServer}/>
    </div>
};
const mapStateToProps = state => ({
    students: state.Students.students
});
export default connect(mapStateToProps, {
    changeStudentInServer,
    addStudentToServer,
    removeStudentFromServer,
    reset
})(Students);