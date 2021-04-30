import React from 'react'
import { StyledInput } from './style'

const HomeInput = (props) => {
  const { type, name, value, onChange, onBlur, ...rest } = props
  return (
    <StyledInput
      placeholder='E-mail address'
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      {...rest}
    />
  )
}

export default HomeInput
