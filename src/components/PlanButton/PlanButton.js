
import React from 'react'
import { PlanCircle, PlanTitle } from './style.js'

const PlanButton = (props) => {
  const { title, _id, active, handleClick } = props
  return (
    <PlanCircle
      active={active}
      onClick={() => handleClick(_id)}
    >
      <PlanTitle>{title}</PlanTitle>
    </PlanCircle>
  )
}

export default PlanButton
