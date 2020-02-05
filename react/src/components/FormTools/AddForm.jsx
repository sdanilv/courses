import React, {useState} from "react";
import {reduxForm, Field} from "redux-form";
import {Button, Icon, IconButton} from "@material-ui/core";
import style from "./AddForm.module.css"
import MyTextField from "./RenderTextField"


const AddForm = props => {
    const [show, editShow] = useState(false);
    const toggleShowForm = () => {
        editShow(!show)
    };
    const mapField = props.fields.map((field, index) =>
        <Field key={index} name={field.name} component={MyTextField} type="text"
               placeholder={field.placeholder}/>);

    return (
        <div className={style.form}>
            <IconButton size="small" onClick={toggleShowForm}><Icon>add_circle</Icon></IconButton>
            {show && <form onSubmit={props.handleSubmit}>
                {mapField}
                <Button type="submit"  disabled={props.pristine || props.submitting}>Submit</Button>
            </form>}
        </div>)
};

export  const field = (name, placeholder) =>{ return {name, placeholder}};
export default reduxForm({form: "addForm"})(AddForm);
