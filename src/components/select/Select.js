import React from 'react';
import './style.css';


const Select = (props) => {
    let options = [];

    props.items.map((itemObject) => {
        for(const keyValue of Object.keys(itemObject)){
            let optionValue = keyValue.replace('_', ' ');
            options.push(<option key={keyValue} value={optionValue}>{itemObject[keyValue]}</option>); 
        }
    })
  
    let className = props.error ? 'select errorStyle' : 'select'; 
    return (
        <div className='formInputGroup'>
             <select onChange={props.onChange} name={props.name} className={className}>
                <option defaultValue >{props.placeholder}</option>
                {options}
            </select>
            <span className='input-error'>{props.error}</span>
        </div>
       
    )
}

export default Select;