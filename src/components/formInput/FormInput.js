import React from 'react'
import './style.css'

const FormInput = (props) => {
  const className = props.error ? 'formInput errorStyle' : 'formInput'
  return (
    <div className='formInputGroup'>
      <input className={className} placeholder={props.placeholder} type={props.type} name={props.name} value={props.value} onChange={props.onChange} onBlur={props.onBlur} />
      <span className='input-error'>{props.error}</span>
    </div>
  )
}

export default FormInput
