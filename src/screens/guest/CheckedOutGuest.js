import React, { useEffect } from 'react'
import Header from '../../components/header'
import { connect } from 'react-redux'
import { setGuest, setDives, setRetail, setCourses, setRentals } from '../../redux/actions/guestActions'
import { setIsLoading } from '../../redux/actions/loadingActions'
import LoadingScreen from '../../components/loadingScreen'
import { FormatDate } from '../../services/dateFormatter'
import axios from 'axios'
import { Row, Col } from 'antd'
import DataList from '../../components/dataList'
import DataTable from '../../components/dataTable'
import moment from 'moment-timezone'

const CheckedOutGuest = (props) => {
  const {
    guest,
    dives,
    courses,
    retail,
    isLoading,
    setGuest,
    setDives,
    setCourses,
    setRetail,
    setRentals,
    setIsLoading
  } = props
  const guestId = props.match.params.id

  useEffect(() => {
    const getAllGuestData = async () => {
      const getGuest = async () => {
        const guestData = await axios.get(`/guest?id=${guestId}`)
        setGuest(guestData.data)
        setDives(guestData.data.registration.dives)
        setCourses(guestData.data.registration.courses)
        setRetail(guestData.data.registration.retail)
      }

      const getRentalItems = async () => {
        const guestRentalsData = await axios.get(`/rentals?guestId=${guestId}`)
        setRentals(guestRentalsData.data)
      }

      await getGuest()
      await getRentalItems()
      setIsLoading(false)
    }

    getAllGuestData()
  }, [])

  const getGuestInfoObject = () => {
    return {
      Name: guest.guest_info.name,
      Email: guest.guest_info.email,
      Country: guest.guest_info.country,
      Address: guest.guest_info.address,
      Zipcode: guest.guest_info.zipcode,
      City: guest.guest_info.city,
      Phone: guest.guest_info.phone,
      'Date of birth': moment(guest.guest_info.date_of_birth).format('DD/MM/YYYY')
    }
  }

  const getDivingInfoObject = () => {
    return {
      'Cert. Agency': guest.diving_info.certification_agency,
      'Cert.Nr': guest.diving_info.certification_number,
      'Cert. Date': moment(guest.diving_info.certification_date).format('DD/MM/YYYY'),
      'Cert. Rank': guest.diving_info.certification_rank ? guest.diving_info.certification_rank : '-',
      'Date last dive': moment(guest.diving_info.date_last_dive).format('DD/MM/YYYY'),
      'Total dives': guest.diving_info.total_dives,
      'Kind of gas': guest.diving_info.type_of_gas
    }
  }

  const getOtherInfoObject = () => {
    return {
      'Hotel/Acco': guest.other_info.hotel ? guest.other_info.hotel : '-',
      Location: guest.other_info.location_dive_center,
      'Marine park tag': guest.other_info.marine_park_tag ? 'Yes' : 'No',
      'Checked in by': guest.other_info.checked_in_by ? guest.other_info.checked_in_by : '-',
      'Emergency phone': guest.other_info.emergency_phone,
      'Arrival date': moment(guest.other_info.arrival_date).format('DD/MM/YYYY'),
      'Departure date': moment(guest.other_info.departure_date).format('DD/MM/YYYY'),
      'Voucher name': guest.other_info.voucher ? guest.other_info.voucher.name : '-',
      Insurance: guest.other_info.insurance ? guest.other_info.insurance.type : '-'
    }
  }

  return (
    <>
      <Header />
      {isLoading ? <LoadingScreen />
        : <div className='container'>
          <div className='center'>
            <h1 className='content-container-title'>{guest.guest_info.name}</h1>
            <p className='content-container-subtitle'>{FormatDate(guest.other_info.departure_date)}</p>
            <p className='content-container-subtitle'>Checked out</p>
          </div>
          <Row gutter={16} style={{ marginTop: '40px' }}>
            <Col span={6}>
              <div className='content-container min-height'>
                <div className='content-title-container'>
                  <p className='content-container-title'>Guest Information</p>
                </div>

                <DataList data={getGuestInfoObject()} />
              </div>
            </Col>
            <Col span={6}>
              <div className='content-container min-height'>
                <div className='content-title-container'>
                  <p className='content-container-title'>Diving Information</p>
                </div>
                <DataList data={getDivingInfoObject()} />
              </div>
            </Col>
            <Col span={6}>
              <div className='content-container min-height'>
                <div className='content-title-container'>
                  <p className='content-container-title'>Other Information</p>
                </div>
                <DataList data={getOtherInfoObject()} />
              </div>
            </Col>
            <Col span={6}>
              <div className='content-container min-height'>
                <div className='content-title-container'>
                  <p className='content-container-title'>Dives</p>
                </div>
                <DataTable maxHeight='315px' singleColumn={SingleColumnDivesTable} data={dives} titles={['Type', 'Date']} />
              </div>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: '40px' }}>
            <Col span={12}>
              <div className='content-container min-height'>
                <div className='content-title-container'>
                  <p className='content-container-title'>Retail</p>
                </div>
                <DataTable maxHeight='315px' singleColumn={SingleColumnRetailTable} data={retail} titles={['Item', 'Price']} />
              </div>
            </Col>
            <Col span={12}>
              <div className='content-container min-height '>
                <div className='content-title-container'>
                  <p className='content-container-title'>Courses</p>
                </div>
                <DataTable maxHeight='315px' singleColumn={SingleColumnCoursesTable} data={courses} titles={['Course', 'By']} />
              </div>
            </Col>
          </Row>
        </div>}
    </>
  )
}

const SingleColumnDivesTable = (props) => {
  return (
    <tr className='table-data-row'>
      <td>{props.dive_type}</td>
      <td>{moment(props.date).format('DD/MM/YYYY')}</td>
    </tr>
  )
}

const SingleColumnRetailTable = (props) => {
  return (
    <tr className='table-data-row'>
      <td>{props.title}</td>
      <td>{`$${props.price}`}</td>
    </tr>
  )
}

const SingleColumnCoursesTable = (props) => {
  return (
    <tr className='table-data-row'>
      <td>{props.title}</td>
      <td>{props.staff.map((staffInitial) => `${staffInitial} `)}</td>
    </tr>
  )
}

const SingleColumnRentalsTable = (props) => {
  const daysRented = calculateDaysRented(props.start_date, props.end_date)
  return (
    <tr className='table-data-row'>
      <td>{props.rental_item.title}</td>
      <td>{moment(props.start_date).format('DD/MM/YYYY')}</td>
      <td>{props.end_date ? moment(props.end_date).format('DD/MM/YYYY') : '-'}</td>
      <td>{daysRented}</td>
    </tr>
  )
}

const calculateDaysRented = (start_date, end_date) => {
  if (!end_date) {
    return '-'
  } else {
    const start = moment(start_date)
    const end = moment(end_date)
    return end.diff(start, 'days') + 1
  }
}

const mapStateToProps = (state) => {
  return {
    guest: state.guestReducer.guest,
    dives: state.guestReducer.dives,
    retail: state.guestReducer.retail,
    courses: state.guestReducer.courses,
    rentals: state.guestReducer.rentals,
    isLoading: state.loadingReducer.isLoading
  }
}

const mapDispatchToProps = { setGuest, setIsLoading, setDives, setCourses, setRetail, setRentals }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckedOutGuest)
