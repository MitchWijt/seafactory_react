import React from 'react'
import DescriptionIcon from '@material-ui/icons/Description'
import Popover from '../../components/popover/Popover'
import CloseIcon from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { removeCalendarItemById } from '../../services/api'

const getCalendarItemPopoverContent = (calendarItem) => {
  return (
    <div>
      <div className='right'>
        <EditIcon className='icon-normal' onClick={() => closePopover()} />
        <DeleteIcon className='icon-normal' onClick={() => deleteCalendarItem(calendarItem._id)} />
        <CloseIcon className='icon-normal' id='deleteIcon' style={{ marginLeft: '30px' }} onClick={() => closePopover()} />
      </div>
      <p className='content-container-title'>{calendarItem.title}</p>
      <p className='content-container-subtitle'>{calendarItem.textualDate}</p>
      <div className='d-flex'>
        <DescriptionIcon style={{ color: '#C4C0B6', marginRight: '10px' }} /><p className='popover-content-text'>{calendarItem.description ? calendarItem.description : 'No description'}</p>
      </div>
    </div>
  )
}

const closePopover = () => {
  document.getElementById('popover').classList.remove('popover-open')
}

const deleteCalendarItem = async (id) => {
  await removeCalendarItemById(id)
  window.location.reload()
}

export const getCalendarItemPopover = (calendarItem, calendarItemRef) => {
  const topOffsetCalendarItemPopup = calendarItemRef.current.getBoundingClientRect().top + 147
  const content = getCalendarItemPopoverContent(calendarItem)
  return <Popover topOffset={topOffsetCalendarItemPopup} content={content} visible />
}
