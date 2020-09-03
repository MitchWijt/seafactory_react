import React from 'react';
import {DatePicker} from 'antd';
import './style.css';


const FormInput = (props) => {
    let className = props.error ? 'formInput errorStyle' : 'formInput'; 
    
    return (
        <div className='formInputGroup'>
            <DatePicker className={className} format='DD-MM-YYYY' onChange={props.onChange} placeholder={props.placeholder} inputReadOnly/> 
            <span className='input-error'>{props.error}</span>
        </div> 
    );
}

export default FormInput;