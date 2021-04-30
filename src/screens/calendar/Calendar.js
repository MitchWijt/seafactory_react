import React, { useEffect, createRef } from 'react'
import {
  setSelectedDate,
  setCalendarItems,
  setLoadingCalendarItems,
  setCalendarItemRefs,
  setCalendarItemPopover,
  setAddCalendarItemModalVisibility,
  setCalendarItemCategories,
  setEditCalendarItemScreen
} from '../../redux/actions/calendarActions'
import { setIsLoading } from '../../redux/actions/loadingActions'
import LoadingScreen from '../../components/loadingScreen'
import Header from '../../components/header'
import { connect } from 'react-redux'
import moment from 'moment-timezone'
import RenderCalendar from './RenderCalendar'
import EditCalendarItem from './components/EditCalendarItem'
import { fetchCalendarItemsByDate, fetchCalendarItemCategories, fetchCalendarItemById } from './serverRequests'
import './style.css'

const Calendar = (props) => {
  const { year, month, day, calendarItemId } = props.match.params

  useEffect(() => {
    props.setSelectedDate(moment(`${year}${month}${day}`, 'YYYYMMDD').format())
    fetchCalendarItems()
    fetchCalendarCategories()

    if (calendarItemId) {
      setEditCalendarItemScreen()
    }
  }, [year, month, day])

  const setEditCalendarItemScreen = async () => {
    const calendarItem = await fetchCalendarItemById(calendarItemId)
    const component = <EditCalendarItem calendarItem={calendarItem} />
    props.setEditCalendarItemScreen(component)
  }

  const handleResponseFetchCalendarItems = (response) => {
    const { data } = response
    props.setCalendarItemRefs(
      Array(data.length)
        .fill(0)
        .map(() => createRef())
    )
    props.setCalendarItems(data)
    props.setCalendarItemPopover('')
  }

  const fetchCalendarItems = async () => {
    props.setLoadingCalendarItems(true)

    const selectedDate = moment(`${year}${month}${day}`, 'YYYYMMDD').format('YYYY-MM-DD')
    const response = await fetchCalendarItemsByDate(selectedDate)

    handleResponseFetchCalendarItems(response)
    props.setIsLoading(false)
    props.setLoadingCalendarItems(false)
  }

  const fetchCalendarCategories = async () => {
    props.setIsLoading(true)

    const response = await fetchCalendarItemCategories()

    handleReponseFetchCalendarCategories(response)
    props.setIsLoading(false)
  }

  const handleReponseFetchCalendarCategories = (response) => {
    const { data } = response
    props.setCalendarItemCategories(data)
  }

  return (
    <>
      {props.editCalendarItemScreen}
      <Header />
      {props.isLoading ? <LoadingScreen /> : <RenderCalendar {...props} />}
    </>

  )
}

const mapStateToProps = (state) => {
  return {
    calendarItems: state.calendarReducer.calendarItems,
    selectedDate: state.calendarReducer.selectedDate,
    calendarItemRefs: state.calendarReducer.calendarItemRefs,
    calendarItemPopover: state.calendarReducer.calendarItemPopover,
    editCalendarItemScreen: state.calendarReducer.editCalendarItemScreen,
    isLoadingCalendarItems: state.calendarReducer.isLoadingCalendarItems,
    isLoading: state.loadingReducer.isLoading
  }
}

const mapDispatchToProps = {
  setSelectedDate,
  setCalendarItems,
  setIsLoading,
  setLoadingCalendarItems,
  setCalendarItemRefs,
  setCalendarItemPopover,
  setAddCalendarItemModalVisibility,
  setCalendarItemCategories,
  setEditCalendarItemScreen
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar)
