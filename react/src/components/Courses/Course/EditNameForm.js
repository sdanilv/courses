import React from "react";
import {Field, reduxForm} from "redux-form";
import Button from "@material-ui/core/Button";

export default reduxForm({form: "courseName"})(  props => {
    return <form onSubmit={props.handleSubmit}>
        <Field name="name" component = "input" />
        <Button type="submit">OK</Button>
    </form>
})
