import React from "react";
import AddForm, {field} from "./AddForm";


const AddStudentForm = props => {
    const fields = [field("name", "Name"),
        field("telephone", "+380661234567"),
        field("email", "email@email.com")];

    return <>
        <AddForm onSubmit={props.onSubmit} fields={fields}/>
    </>
};

export default AddStudentForm;
// export default reduxForm({form: "addStudent"})(AddStudentForm);
