import React, { useEffect } from 'react'
import { Modal } from 'antd'
import { connect } from 'react-redux'
import { setRentalItems } from '../../../redux/actions/rentalItemsActions'
import { setInventoryItems } from '../../../redux/actions/inventoryActions'
import { setModalVisibility, setRentals } from '../../../redux/actions/guestActions'
import Button from '../../../components/button'
import Select from '../../../components/select'
import { Formik } from 'formik'
import Checkbox from '../../../components/checkbox'
import FormInput from '../../../components/formInput'
import moment from 'moment-timezone'
import DatePicker from '../../../components/datePicker'
import { parseArrayToSelectValues } from '../../../services/selectHelper'
import * as Yup from 'yup'
import { getGuestRentalsData, postRentals, getRentalItem, getInventoryItem } from '../../../services/api'



const MODAL_VISIBILITY_NAME = 'addRental'

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

const RentalModal = (props) => {
  useEffect(() => {
    const getRentalItems = async () => {
      const rentalItemsRequest = getRentalItem()
      props.setRentalItems(rentalItemsRequest.data)
    }

    const getInventoryItems = async () => {
      const inventoryItemsRequest = getInventoryItem()
      props.setInventoryItems(inventoryItemsRequest.data)
    }

    getRentalItems()
    getInventoryItems()
    // eslint-disable-next-line
  }, [])

  const initialValues = {
    guest: props.guest._id,
    rental_item: '',
    inventory: '',
    start_date: '',
    end_date: '',
    location: '',
    discount: null,
    paid: false
  }

  const handleDateChange = (date, values, dateSelector) => {
    values[dateSelector] = moment(date).format()
  }

  return (
    <>
      <Modal
        visible={props.visibility}
        title='Add rental'
        onCancel={() => props.setModalVisibility(MODAL_VISIBILITY_NAME, false)}
        footer={null}
      >
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true)
            await postRentals(values)

            const guestRentalsData = getGuestRentalsData(props.guest._id)
            props.setRentals(guestRentalsData.data)
            props.setModalVisibility(MODAL_VISIBILITY_NAME, false)
            setSubmitting(false)
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
              <DatePicker error={errors.start_date} placeholder='Start date' onChange={(date) => handleDateChange(date, values, 'start_date')} />
              <DatePicker placeholder='End date' onChange={(date) => handleDateChange(date, values, 'end_date')} />
              <Select error={errors.rental_item} items={parseArrayToSelectValues(props.rentalItems, '_id', 'title')} placeholder='Rental item' name='rental_item' onChange={handleChange} value={values.rental_item} />
              <Select error={errors.inventory} items={parseArrayToSelectValues(props.inventoryItems, '_id', 'title')} placeholder='Inventory item' name='inventory' onChange={handleChange} value={values.inventory} />
              <Select error={errors.location} items={parseArrayToSelectValues(props.diveCenterLocations)} placeholder='Dive center location' name='location' onChange={handleChange} value={values.location} />
              <FormInput type='number' placeholder='Discount' name='discount' onChange={handleChange} value={values.discount} />
              <Checkbox label='Guest has paid' name='paid' />
              <div className='right'>
                <Button isLoading={isSubmitting} type='submit' category='cta' fontType='bold' text='Save' />
              </div>
            </form>
          )}
        </Formik>
      </Modal>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    guest: state.guestReducer.guest,
    diveCenterLocations: state.userStateReducer.user.locations,
    visibility: state.guestReducer.rentalModalVisibility,
    rentalItems: state.rentalItemsReducer.rentalItems,
    inventoryItems: state.inventoryReducer.inventoryItems,
    addRentalModalIsActive: state.rentalReducer.addRentalModalIsActive,
    editRentalModalIsActive: state.rentalReducer.editRentalModalIsActive,
    singleRental: state.rentalReducer.singleRental
  }
}

const mapDispatchToProps = { setModalVisibility, setRentals, setInventoryItems, setRentalItems }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RentalModal)
