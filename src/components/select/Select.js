import React from 'react';
import './style.css';

const Select = (props) => {
    let className = props.error ? 'select errorStyle' : 'select'; 
    return (
        <div className='formInputGroup'>
             <select onChange={props.onChange} name={props.name} className={className}>
                <option defaultValue >{props.placeholder}</option>
                {props.items.map((item) => {
                    return <option key={item} value={item}>{item}</option>
                })}
            </select>
            <span className='input-error'>{props.error}</span>
        </div>
       
    )
}

export default Select;