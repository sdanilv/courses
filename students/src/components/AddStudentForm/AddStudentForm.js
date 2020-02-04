import React from "react";
import {reduxForm, Field } from "redux-form";

const AddStudentForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field name="name" component="input" type="text" placeholder = "Name"/>
            <Field  name="age" component="input" type="text" placeholder = "Age"/>
            <Field  name="averageMark" component="input" type="text" placeholder = "Average mark"/>
            <button type="submit">Submit</button>
        </form>)
};

export default reduxForm({form: "addStudent"})(AddStudentForm);
