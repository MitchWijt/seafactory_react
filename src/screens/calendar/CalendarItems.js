import React from 'react'
import { Row, Col } from 'antd'
import ContentCard from '../../components/contentCard/ContentCard'
import ContentCircle from '../../components/contentCircle/ContentCircle'
import { getCalendarItemPopover } from './calendarItemPopover'

const CalendarItems = ({ calendarItems, calendarItemRefs, setCalendarItemPopover }) => {
  const openPopover = (calendarItem, index) => {
    const popover = getCalendarItemPopover(calendarItem, calendarItemRefs[index])
    setCalendarItemPopover(popover)
    if (document.getElementById('popover')) {
      document.getElementById('popover').classList.add('popover-open')
    }
  }

  return (
    calendarItems.length < 1
      ? <div className='center' style={{ marginTop: '30px' }}><p>No results...</p></div>
      : <Row gutter={16} style={{ marginTop: '30px' }}>
        {calendarItems.map((calendarItem, i) => {
          return (
            <Col span={8} key={i}>
              <ContentCard
                parentRef={calendarItemRefs[i]}
                onClick={() => openPopover(calendarItem, i)}
                mainTitle={calendarItem.title}
                subTitle={calendarItem.textualStartTime}
                topLeft={<StaffCircles staff={calendarItem.staff} />}
              />
            </Col>
          )
        })}
        </Row>
  )
}

const StaffCircles = (props) => {
  return (
    <>
      {props.staff.map((staff) => {
        return <ContentCircle key={staff.initials} content={staff.initials} />
      })}
    </>
  )
}
export default CalendarItems
