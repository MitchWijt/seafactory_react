import React from 'react'
import './style.css'

const Select = (props) => {
  const options = []

  props.items.forEach((itemObject) => {
    for (const keyValue of Object.keys(itemObject)) {
      const optionValue = keyValue.replace('_', ' ')
      if (keyValue === props.value) {
        options.push(<option selected key={keyValue} value={optionValue}>{itemObject[keyValue]}</option>)
      } else {
        options.push(<option key={keyValue} value={optionValue}>{itemObject[keyValue]}</option>)
      }
    }
  })

  const className = props.error ? 'select errorStyle' : 'select'
  return (
    <div className='formInputGroup'>
      <select onChange={props.onChange} name={props.name} className={className}>
        <option selected disabled>{props.placeholder}</option>
        {options}
      </select>
      <span className='input-error'>{props.error}</span>
    </div>

  )
}

export default Select
