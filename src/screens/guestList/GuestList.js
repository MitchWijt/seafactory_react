import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import urlParamsParser from '../../services/urlParamsParser'
import LoadingScreen from '../../components/loadingScreen/LoadingScreen'
import { setGuests } from '../../redux/actions/guestListActions'
import { setIsLoading } from '../../redux/actions/loadingActions'
import Button from '../../components/button/Button'
import Header from '../../components/header/Header'
import { FormatDate } from '../../services/dateFormatter'
import DataTable from '../../components/dataTable/DataTable'
import { getGuestDataByUrl } from '../../services/api'



const GuestList = (props) => {
  const { location, isLoading, guests, setIsLoading, setGuests } = props

  useEffect(() => {
    const url = getReqUrlBasedOnParams(location.search)
    const getGuests = async () => {
      const res = await getGuestDataByUrl(url)

      setGuests(res.data)
      setIsLoading(false)
    }
    getGuests()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Header history={props.history} />
      {isLoading
        ? <LoadingScreen />
        : <div className='container'>
          <div className='content-container'>
            <p className='content-container-title'>Guests</p>
            <div style={{ maxHeight: '420px' }} className='scroll-content-container'>
              <DataTable singleColumn={SingleColumn} data={guests} titles={['Name', 'Local', 'Dep. Date', 'Marine tag', 'Checked in by', '']} />
            </div>
          </div>
        </div>}

    </>
  )
}

const SingleColumn = (props) => {
  return (
    <tr className='table-data-row'>
      <td>{props.guest_info.name}</td>
      <td>{props.local ? 'Yes' : 'No'}</td>
      <td>{props.other_info.departure_date ? FormatDate(props.other_info.departure_date) : '-'}</td>
      <td>{props.other_info.marine_park_tag ? 'Yes' : 'No'}</td>
      <td>{props.registration.checked_in_by ? props.registration.checked_in_by : '-'}</td>
      <td><Button onClick={() => window.location.href = `/guest/${props._id}`} type='submit' category='table-cta' fontSize='14px' fontType='bold' text='Open' /></td>
    </tr>
  )
}

const getReqUrlBasedOnParams = (params) => {
  const { name, dep_date } = urlParamsParser(params)
  if (name) {
    return `/guest?name=${name}`
  } else if (dep_date) {
    return `/guest?dep_date=${dep_date}`
  } else {
    return '/guest'
  }
}

const mapStateToProps = (state) => {
  return {
    userState: state.userStateReducer,
    isLoading: state.loadingReducer.isLoading,
    guests: state.guestListReducer.guests
  }
}

const mapDispatchToProps = { setGuests, setIsLoading }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuestList)
