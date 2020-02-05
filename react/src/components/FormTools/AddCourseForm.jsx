import React from "react";
import AddForm, {field} from "./AddForm";


const AddCoursesForm = props => {
    const fields = [field("name", "Name")];

    return <>
        <AddForm onSubmit={props.onSubmit} fields={fields}/>
    </>
};

// export default reduxForm({form: "addCourse"})(AddStudentForm);
export default AddCoursesForm;


