import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Button from '../../../components/button'
import { setGuest, setModalVisibility } from '../../../redux/actions/guestActions'
import { setInsuranceItems } from '../../../redux/actions/productItemsActions'
import { setStaffMembers } from '../../../redux/actions/staffActions'
import axios from 'axios'
import moment from 'moment-timezone'
import FormInput from '../../../components/formInput'
import Select from '../../../components/select'
import Checkbox from '../../../components/checkbox'
import DatePicker from '../../../components/datePicker'
import { parseArrayToSelectValues } from '../../../services/selectHelper'
import { getUserInsuranceItems } from '../../../services/api'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Modal } from 'antd'

const EditOtherInfoForm = (props) => {
  const { setInsuranceItems, insuranceItems, diveCenterLocations, staffMembers, setModalVisibility } = props

  useEffect(() => {
    const getInsuranceProductCategory = async () => {
      const insuranceItems = await getUserInsuranceItems()
      props.setInsuranceItems(insuranceItems)
    }

    const getStaffMembers = async () => {
      const staffMembers = await axios.get('/staff')
      props.setStaffMembers(staffMembers.data)
    }

    getInsuranceProductCategory()
    getStaffMembers()
    // eslint-disable-next-line
  }, [setInsuranceItems])

  const validationSchema = Yup.object({
    other_info: Yup.object({
      location_dive_center: Yup.string()
        .required('Location is required')
    })
  })

  const handleDateChange = (date, values, dateSelector) => {
    values.other_info[dateSelector] = moment(date).format()
  }

  return (

    <>
      <Modal
        visible={props.visibility}
        title='Edit other info'
        onCancel={() => props.setModalVisibility('editOtherInfo', false)}
        footer={null}
      >
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{ guestId: props.guest._id, ...props.guest }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true)
            const updatedGuest = await axios.put('/guest', values)
            setGuest(updatedGuest.data)
            setSubmitting(false)
            setModalVisibility('editOtherInfo', false)
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
              <FormInput type='text' placeholder='Hotel/Acco' name='other_info.hotel' onChange={handleChange} value={values.other_info.hotel} />
              <Select error={errors.other_info ? errors.diving_info.location : null} items={parseArrayToSelectValues(diveCenterLocations)} placeholder='Location dive center' name='other_info.location_dive_center' onChange={handleChange} value={values.other_info.location_dive_center} />
              <Checkbox name='other_info.marine_park_tag' label='Has marine park tag' />
              <Select items={parseArrayToSelectValues(staffMembers, 'initials', 'name')} placeholder='Checked in by' name='other_info.checked_in_by' onChange={handleChange} value={values.other_info.checked_in_by} />
              <FormInput type='text' placeholder='Emergency phone' name='other_info.emergency_phone' onChange={handleChange} value={values.other_info.emergency_phone} />
              <DatePicker placeholder='Arrival date' onChange={(date) => handleDateChange(date, values, 'arrival_date')} />
              <DatePicker placeholder='Departure date' onChange={(date) => handleDateChange(date, values, 'departure_date')} />
              <FormInput type='text' placeholder='Voucher name' name='other_info.voucher.name' onChange={handleChange} value={values.other_info.voucher ? values.other_info.voucher.name : ''} />
              <Select items={parseArrayToSelectValues(insuranceItems, 'title', 'title')} placeholder='Insurance' name='other_info.insurance.name' onChange={handleChange} value={values.other_info.insurance ? values.other_info.insurance.name : ''} />
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
    visibility: state.guestReducer.editOtherInfoModalVisibility,
    insuranceItems: state.productItemsReducer.insuranceItems,
    staffMembers: state.staffReducer.staffMembers
  }
}

const mapDispatchToProps = { setGuest, setModalVisibility, setInsuranceItems, setStaffMembers }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditOtherInfoForm)
