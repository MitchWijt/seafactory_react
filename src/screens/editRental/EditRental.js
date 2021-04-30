import React, { useEffect } from 'react'
import Header from '../../components/header'
import LoadingScreen from '../../components/loadingScreen'
import { setIsLoading } from '../../redux/actions/loadingActions'
import { setSingleRental } from '../../redux/actions/rentalActions'
import { setRentalItems } from '../../redux/actions/rentalItemsActions'
import { setInventoryItems } from '../../redux/actions/inventoryActions'
import { connect } from 'react-redux'
import Button from '../../components/button'
import { Formik } from 'formik'
import { setGuest } from '../../redux/actions/guestActions'
import Checkbox from '../../components/checkbox'
import FormInput from '../../components/formInput'
import Select from '../../components/select'
import moment from 'moment-timezone'
import DatePicker from '../../components/datePicker'
import axios from 'axios'
import { parseArrayToSelectValues } from '../../services/selectHelper'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  start_date: Yup.string()
    .required('Start date is required'),
  inventory: Yup.string()
    .required('Inventory is required'),
  location: Yup.string()
    .required('Dive center location is required'),
  rental_item: Yup.string()
    .required('Rental item is required')
})

const EditRental = (props) => {
  const { isLoading, singleRental, setIsLoading, setSingleRental, setRentalItems, setInventoryItems } = props

  useEffect(() => {
    const rentalId = props.match.params.id
    const getRental = async () => {
      const rentalRequest = await axios.get(`/rentals?id=${rentalId}`)
      setSingleRental(rentalRequest.data)
      setIsLoading(false)
    }

    const getRentalItems = async () => {
      const rentalItemsRequest = await axios.get('/rental-item')
      setRentalItems(rentalItemsRequest.data)
    }

    const getInventoryItems = async () => {
      const inventoryItemsRequest = await axios.get('/inventory')
      setInventoryItems(inventoryItemsRequest.data)
    }

    getRentalItems()
    getInventoryItems()
    getRental()
    // eslint-disable-next-line
  }, [])

  const getInitialValues = () => {
    return {
      id: singleRental._id,
      guest: singleRental.guest,
      rental_item: singleRental.rental_item._id,
      inventory: singleRental.inventory._id,
      start_date: singleRental.start_date,
      end_date: singleRental.end_date,
      location: singleRental.location,
      discount: singleRental.discount,
      paid: singleRental.paid
    }
  }

  const handleDateChange = (date, values, dateSelector) => {
    values[dateSelector] = moment(date).format()
  }

  return (
    <>
      <Header />
      {isLoading
        ? <LoadingScreen />
        : <div className='container'>
          <div className='center'>
            <h1 className='content-container-title'>{singleRental.rental_item.title}</h1>
            <>
              <Formik
                validateOnBlur={false}
                validateOnChange={false}
                initialValues={getInitialValues()}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  setSubmitting(true)
                  await axios.put(`/rentals?id=${values.id}`, values)
                  setSubmitting(false)
                  window.location.href = `/guest/${values.guest}`
                }}
              >
                {({
                  values,
                  errors,
                  isSubmitting,
                  handleChange,
                  handleSubmit
                }) => (
                  <form onSubmit={handleSubmit}>
                    <DatePicker error={errors.start_date} placeholder={moment(values.start_date).format('DD-MM-YYYY')} onChange={(date) => handleDateChange(date, values, 'start_date')} />
                    <DatePicker placeholder={values.end_date ? moment(values.end_date).format('DD-MM-YYYY') : 'End date'} onChange={(date) => handleDateChange(date, values, 'end_date')} />
                    <Select error={errors.rental_item} items={parseArrayToSelectValues(props.rentalItems, '_id', 'title')} placeholder='Rental item' name='rental_item' onChange={handleChange} value={values.rental_item} />
                    <Select error={errors.inventory} items={parseArrayToSelectValues(props.inventoryItems, '_id', 'title')} placeholder='Inventory item' name='inventory' onChange={handleChange} value={values.inventory} />
                    <Select error={errors.locarion} items={parseArrayToSelectValues(props.diveCenterLocations)} placeholder='Dive center location' name='location' onChange={handleChange} value={values.location} />
                    <FormInput type='number' placeholder='Discount' name='discount' onChange={handleChange} value={values.discount} />
                    <Checkbox label='Guest has paid' name='paid' />
                    <div className='right'>
                      <Button isLoading={isSubmitting} type='submit' category='cta' fontType='bold' text='Save' />
                    </div>
                  </form>
                )}
              </Formik>
            </>
          </div>
          </div>}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    guest: state.guestReducer.guest,
    singleRental: state.rentalReducer.singleRental,
    isLoading: state.loadingReducer.isLoading,
    diveCenterLocations: state.userStateReducer.user.locations,
    rentalItems: state.rentalItemsReducer.rentalItems,
    inventoryItems: state.inventoryReducer.inventoryItems
  }
}

const mapDispatchToProps = { setIsLoading, setSingleRental, setInventoryItems, setRentalItems, setGuest }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRental)
