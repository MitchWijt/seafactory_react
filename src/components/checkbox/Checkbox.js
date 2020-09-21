import React from 'react';
import './style.css';
import {Field} from 'formik';

const Checkbox = (props) => {
    return (
        <div className='checkbox-container'>
            <Field className='checkbox' type='checkbox' name={props.name} id={props.name}/>
            <label htmlFor={props.name}>{props.label}</label>
        </div>
    )
}

export default Checkbox;
