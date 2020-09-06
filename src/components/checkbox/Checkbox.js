import React from 'react';
import './style.css';

const Checkbox = (props) => {
    return (
        <div className='checkbox-container'>
            <input className='checkbox' onChange={props.onChange} id={props.name} name={props.name} type="checkbox"/>
            <label htmlFor={props.name}>{props.label}</label>
        </div>
    )
}

export default Checkbox;
