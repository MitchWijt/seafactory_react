import React from 'react';
import {DatePicker} from 'antd';
import moment from 'moment-timezone';
import './style.css';


const FormInput = (props) => {
    let className = props.error ? 'formInput errorStyle' : 'formInput'; 
    let defaultValue = props.defaultValue ? moment(props.defaultValue, 'YYYY-MM-DD') : null; 
    
    return (
        <div className='formInputGroup'>
            <DatePicker defaultValue={defaultValue} className={className} format='DD-MM-YYYY' onChange={props.onChange} placeholder={props.placeholder} inputReadOnly/> 
            <span className='input-error'>{props.error}</span>
        </div> 
    );
}

export default FormInput;