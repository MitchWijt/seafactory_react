import React from 'react'
import { Row, Col } from 'antd'
import Button from '../../components/button'
import LoadingCircle from '../../components/loadingCircle'
import moment from 'moment-timezone'
import AddCalendarItemModal from './modals/AddCalendarItemModal'
import CalendarDatepicker from './CalendarDatepicker'
import CalendarItems from './CalendarItems'

const RenderCalendar = (props) => {
  return (

    <>
      <div className='container'>
        <Row gutter={16}>
          <Col span={6}>
            <Button type='button' category='cta' fontType='bold' text='Add item' onClick={() => props.setAddCalendarItemModalVisibility(true)} />
            <CalendarDatepicker value={moment(props.selectedDate)} history={props.history} />
          </Col>
          <Col span={18}>
            <h1 className='content-container-title'>{moment(props.selectedDate).format('MMMM DD YYYY')}</h1>
            {props.isLoadingCalendarItems
              ? <div className='center' style={{ marginTop: '30px' }}><LoadingCircle fontSize={50} color='#FF6F61' /></div>
              : <CalendarItems
                  calendarItems={props.calendarItems}
                  calendarItemRefs={props.calendarItemRefs}
                  setCalendarItemPopover={props.setCalendarItemPopover}
                />}
          </Col>
        </Row>

        {props.calendarItemPopover}
        <AddCalendarItemModal />
      </div>
    </>
  )
}

export default RenderCalendar
