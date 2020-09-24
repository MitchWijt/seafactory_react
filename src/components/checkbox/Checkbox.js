import React from 'react';
import './style.css';
import {Field} from 'formik';
import PropTypes from 'prop-types';

const Checkbox = (props) => {
    return (
        <div className='checkbox-container'>
            <Field className='checkbox' type='checkbox' name={props.name} id={props.name}/>
            <label htmlFor={props.name}>{props.label}</label>
        </div>
    )
}

Checkbox.propTypes = {
    name: PropTypes.element.isRequired,
    name: PropTypes.string,
    label: PropTypes.element.isRequired,
    label: PropTypes.string
}

export default Checkbox;
