import React from 'react'
import CloseIcon from '@material-ui/icons/Close'
import './style.css'

const SelectListItem = (props) => {
  return (
    <div className='select-list-item d-flex jc-between ai-center'>
      <p className='select-list-item-text'>{props.text}</p>
      <CloseIcon onClick={props.onDelete} className='select-list-item-delete-icon' />
    </div>
  )
}

export default SelectListItem
