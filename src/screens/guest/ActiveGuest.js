import React, { useEffect } from 'react'
import Header from '../../components/header'
import { connect } from 'react-redux'
import { setGuest, setAmountDue, setDives, setRetail, setCourses, setRentals, setModalVisibility, setIsLoadingCheckout } from '../../redux/actions/guestActions'
import { setIsLoading } from '../../redux/actions/loadingActions'
import LoadingScreen from '../../components/loadingScreen'
import { FormatDate } from '../../services/dateFormatter'
import Button from '../../components/button'
import axios from 'axios'
import { Row, Col } from 'antd'
import DataList from '../../components/dataList'
import DataTable from '../../components/dataTable'
import DivesModal from './modals/DivesModal'
import RetailModal from './modals/RetailModal'
import CourseModal from './modals/CourseModal'
import RentalModal from './modals/RentalModal'
import moment from 'moment-timezone'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import EditGuestInfoModal from './modals/EditGuestInfoModal'
import EditDivingInfoModal from './modals/EditDivingInfoModal'
import EditOtherInfoModal from './modals/EditOtherInfoModal'
import CheckoutModal from './modals/CheckoutModal'
import { getAmountDue } from '../../services/checkoutGuest'

const ActiveGuest = (props) => {
  const {
    guest,
    dives,
    courses,
    rentals,
    retail,
    isLoading,
    isLoadingCheckout,
    setGuest,
    setDives,
    setCourses,
    setRetail,
    setRentals,
    setIsLoading,
    setModalVisibility,
    setIsLoadingCheckout,
    setAmountDue
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
    // eslint-disable-next-line
  }, [])

  const openCheckoutModal = async () => {
    setIsLoadingCheckout(true)
    const amountDue = await getAmountDue(guest.registration._id)
    setAmountDue(amountDue)
    setIsLoadingCheckout(false)
    setModalVisibility('checkoutModal', true)
  }

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
            <Button isLoading={isLoadingCheckout} type='button' category='cta' fontType='bold' fontSize='11px' text='Check out' onClick={openCheckoutModal} />
            <CheckoutModal />
          </div>
          <Row gutter={16} style={{ marginTop: '40px' }}>
            <Col span={6}>
              <div className='content-container min-height'>
                <div className='content-title-container'>
                  <p className='content-container-title'>Guest Information</p>
                  <EditIcon className='content-container-icon' onClick={() => setModalVisibility('editGuestInfo', true)} />
                </div>

                <DataList data={getGuestInfoObject()} />
                <EditGuestInfoModal />
              </div>
            </Col>
            <Col span={6}>
              <div className='content-container min-height'>
                <div className='content-title-container'>
                  <p className='content-container-title'>Diving Information</p>
                  <EditIcon className='content-container-icon' onClick={() => setModalVisibility('editDivingInfo', true)} />
                </div>
                <DataList data={getDivingInfoObject()} />
                <EditDivingInfoModal />
              </div>
            </Col>
            <Col span={6}>
              <div className='content-container min-height'>
                <div className='content-title-container'>
                  <p className='content-container-title'>Other Information</p>
                  <EditIcon className='content-container-icon' onClick={() => setModalVisibility('editOtherInfo', true)} />
                </div>
                <DataList data={getOtherInfoObject()} />
                <EditOtherInfoModal />
              </div>
            </Col>
            <Col span={6}>
              <div className='content-container min-height'>
                <div className='content-title-container'>
                  <p className='content-container-title'>Dives</p>
                  <AddIcon className='content-container-icon' onClick={() => setModalVisibility('addDive', true)} />
                </div>
                <DataTable maxHeight='315px' singleColumn={SingleColumnDivesTable} data={dives} titles={['Type', 'Date']} />
                <DivesModal />
              </div>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: '40px' }}>
            <Col span={12}>
              <div className='content-container min-height'>
                <div className='content-title-container'>
                  <p className='content-container-title'>Rentals</p>
                  <AddIcon className='content-container-icon' onClick={() => setModalVisibility('addRental', true)} />
                </div>
                <DataTable maxHeight='315px' singleColumn={SingleColumnRentalsTable} data={rentals} titles={['Item', 'Start date', 'End date', 'Days rented', '']} />
                <RentalModal />
              </div>
            </Col>
            <Col span={6}>
              <div className='content-container min-height'>
                <div className='content-title-container'>
                  <p className='content-container-title'>Retail</p>
                  <AddIcon className='content-container-icon' onClick={() => setModalVisibility('addRetail', true)} />
                </div>
                <DataTable maxHeight='315px' singleColumn={SingleColumnRetailTable} data={retail} titles={['Item', 'Price']} />
                <RetailModal />
              </div>
            </Col>
            <Col span={6}>
              <div className='content-container min-height '>
                <div className='content-title-container'>
                  <p className='content-container-title'>Courses</p>
                  <AddIcon className='content-container-icon' onClick={() => setModalVisibility('addCourse', true)} />
                </div>
                <DataTable maxHeight='315px' singleColumn={SingleColumnCoursesTable} data={courses} titles={['Course', 'By']} />
                <CourseModal />
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
      <td><Button onClick={() => window.open(`/rental/${props._id}`, '_blank')} type='submit' category='table-cta' fontSize='14px' fontType='bold' text='Edit' /></td>
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
    isLoading: state.loadingReducer.isLoading,
    isLoadingCheckout: state.guestReducer.isLoadingCheckout
  }
}

const mapDispatchToProps = { setGuest, setIsLoading, setDives, setCourses, setRetail, setRentals, setModalVisibility, setAmountDue, setIsLoadingCheckout }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveGuest)
