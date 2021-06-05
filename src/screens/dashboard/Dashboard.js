import React, { useEffect } from 'react'
import Header from '../../components/header'
import { connect } from 'react-redux'
import { addGuests, addStaffWorking, addTodoToday, addWeather } from '../../redux/actions/dashboardActions'
import { setIsLoading } from '../../redux/actions/loadingActions'
import LoadingScreen from '../../components/loadingScreen'
import ContentCircle from '../../components/contentCircle'
import ContentCard from '../../components/contentCard'
import moment from 'moment-timezone'
import { Link } from 'react-router-dom'
import Button from '../../components/button'
import { Row, Col } from 'antd'
import './style.css'
import { api, getStaffByField, getWeatherByLocation } from '../../services/api'

const Dashboard = (props) => {
  useEffect(() => {
    props.setIsLoading(true)
    const fetchDashboardData = async () => {
      await fetchWeatherData(props.addWeather)
      await fetchStaffWorking(props.addStaffWorking)
      await fetchToDoToday(props.addTodoToday)
      await fetchGuestsCheckingOut(props.addGuests)
      props.setIsLoading(false)
    }

    fetchDashboardData(props.location.pathname)
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Header />
      {props.isLoading
        ? <LoadingScreen />
        : <div className='container'>
          <Row gutter={16}>
            <Col span={8}>
              <div className='content-container'>
                <p className='content-container-title'>Staff today</p>
                <div className='d-flex fd-row jc-center'>
                  {props.staffWorking.map((staff) => <ContentCircle key={staff.initials} content={staff.initials} type='large' />)}
                </div>
              </div>
              <div className='content-container'>
                <p className='content-container-title'>To Do Today</p>
                <div className='d-flex fd-column jc-center scroll-content-container dashboard-todo-container'>
                  {props.toDoToday.map((toDoItem) => {
                    return (
                      <ContentCard
                        key={toDoItem.title}
                        mainTitle={toDoItem.title}
                        subTitle={`${moment(toDoItem.start_time).format('hh:mm A')} - ${moment(toDoItem.end_time).format('hh:mm A')}`}
                        topLeft={<ToDoTodayStaffCircles staff={toDoItem.staff} />}
                      />
                    )
                  })}
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className='content-container'>
                <p className='content-container-title'>Weather</p>
                <div className='d-flex fd-row jc-center ai-center dashboard-weather'>
                  <img src={props.weather.current.imageUrl} className='dashboard-weather-image' alt='' />
                  <span>{props.weather.current.temperature}ºC </span>
                  <span>{props.weather.current.winddisplay}</span>
                </div>
                <WeatherTable data={props.weather.forecast} titles={['Date', 'Temperature', 'Description']} />
              </div>
            </Col>
            <Col span={8}>
              <div className='content-container'>
                <p className='content-container-title'>Guests checking out today</p>
                <div className='scroll-content-container dashboard-checkout-container'>
                  <GuestsCheckingOutTable data={props.guestsCheckingOut} titles={['Name', 'Dep. Date', '']} />
                </div>
              </div>
            </Col>
          </Row>
        </div>}
    </>
  )
}

const fetchGuestsCheckingOut = async (addGuests) => {
  const guestsCheckingOutResponse = await api.get(`/guest?dep_date=${moment().format('YYYY-MM-DD')}`)
  addGuests(guestsCheckingOutResponse.data)
}

const fetchToDoToday = async (addToDoToday) => {
  const toDoTodayResponse = await api.get(`/calendar?date=${moment().format('YYYY-MM-DD')}`)
  addToDoToday(toDoTodayResponse.data)
}

const fetchStaffWorking = async (addStaffWorking) => {
  const staffWorkingResponse = await getStaffByField('workingToday', true)
  addStaffWorking(staffWorkingResponse.data)
}

const fetchWeatherData = async (addWeather) => {
  try {
    const weatherResponse = await getWeatherByLocation('Kralendijk,Bonaire')
    const forecastData = weatherResponse.data[0]
    addWeather(forecastData)
  } catch (e) {
    console.log(e.response.data.description)
  }
}

const SingleDataTitle = (props) => {
  return (
    <>
      <th style={{ width: `${props.width}%` }} className='column-title'>{props.title}</th>
    </>
  )
}

const WeatherTable = (props) => {
  const WeatherTableColumn = (props) => {
    return (
      <tr className='table-data-row'>
        <td>{`${props.shortday} ${moment(props.date).format('MMMM DD')}`}</td>
        <td>{props.high}</td>
        <td>{props.skytextday}</td>
      </tr>
    )
  }

  return (
    <div>
      <div className='table-body-data'>
        {props.data.length > 0
          ? <table className='table'>
            <thead>
              <tr>
                {props.titles.map((title) => <SingleDataTitle width={100 / props.titles.length} key={title} title={title} />)}
              </tr>
            </thead>
            <tbody className='table-body-data'>
              {props.data.map((data) => <WeatherTableColumn key={data.date} {...data} />)}
            </tbody>

          </table>
          : <div className='center'>
            <p id='no-results-text'>No results...</p>
            </div>}
      </div>
    </div>
  )
}

const GuestsCheckingOutTable = (props) => {
  const GuestsCheckingOutTableColumn = (props) => {
    return (
      <tr className='table-data-row'>
        <td>{props.guest_info.name}</td>
        <td>{moment(props.other_info.departure_date).format('DD/MM/YY')}</td>
        <td><Link to={`/guest/${props._id}`}><Button type='submit' category='table-cta' fontSize='14px' fontType='bold' text='Open form' /> </Link></td>
      </tr>
    )
  }

  return (
    <div>
      <div className='table-body-data'>
        {props.data.length > 0
          ? <table className='table'>
            <thead>
              <tr>
                {props.titles.map((title) => <SingleDataTitle width={100 / props.titles.length} key={title} title={title} />)}
              </tr>
            </thead>
            <tbody className='table-body-data'>
              {props.data.map((data) => <GuestsCheckingOutTableColumn key={data._id} {...data} />)}
            </tbody>

          </table>
          : <div className='center'>
            <p id='no-results-text'>No results...</p>
            </div>}
      </div>
    </div>
  )
}

const ToDoTodayStaffCircles = (props) => {
  return (
    <>
      {props.staff.map((staff) => {
        return <ContentCircle key={staff.initials} content={staff.initials} />
      })}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    weather: state.dashboardReducer.weather,
    staffWorking: state.dashboardReducer.staffWorking,
    toDoToday: state.dashboardReducer.toDoToday,
    guestsCheckingOut: state.dashboardReducer.guestsCheckingOut,
    isLoading: state.loadingReducer.isLoading
  }
}

const mapDispatchToProps = { addGuests, addStaffWorking, addTodoToday, addWeather, setIsLoading }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
