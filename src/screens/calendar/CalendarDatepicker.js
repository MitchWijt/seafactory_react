import React from 'react'
import { Calendar } from 'antd'

const CalendarDatepicker = ({ value, history }) => {
  return (
    <div className='calendar-date-picker' style={{ marginTop: '30px' }}>
      <Calendar value={value} fullscreen={false} onSelect={(dateObject) => onDateSelect(dateObject, history)} />
    </div>
  )
}

const onDateSelect = (dateMomentObject, history) => {
  const selectedYear = dateMomentObject.format('YYYY')
  const selectedMonth = dateMomentObject.format('MM')
  const selectedDay = dateMomentObject.format('DD')
  history.push({ pathname: `/calendar/${selectedYear}/${selectedMonth}/${selectedDay}` })
}

export default CalendarDatepicker
