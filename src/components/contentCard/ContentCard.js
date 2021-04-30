import React from 'react'
import './style.css'

const ContentCard = (props) => {
  return (
    <div ref={props.parentRef} className='content-card' onClick={props.onClick}>
      <div className='d-flex jc-between'>
        <div className='topLeft d-flex fd-row'>
          {props.topLeft ? props.topLeft : ''}
        </div>
        <div className='editButton'>
          <div onClick={props.editFunction}>
            {props.edit ? props.edit : ''}
          </div>
        </div>
      </div>
      <div className='content-card-data'>
        <p className='content-card-main-title'>{props.mainTitle}</p>
        <p className='content-card-sub-title'>{props.subTitle}</p>
      </div>
    </div>
  )
}

export default ContentCard
