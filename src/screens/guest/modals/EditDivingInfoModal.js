import React from 'react'
import { connect } from 'react-redux'
import Button from '../../../components/button'
import { setGuest, setModalVisibility } from '../../../redux/actions/guestActions'
import moment from 'moment-timezone'
import FormInput from '../../../components/formInput'
import Select from '../../../components/select'
import DatePicker from '../../../components/datePicker'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Modal } from 'antd'
import { updateGuest } from '../../../services/api'

const EditDivingInfoForm = (props) => {
  const { setGuest, setModalVisibility } = props

  const validationSchema = Yup.object({
    diving_info: Yup.object({
      type_of_gas: Yup.string()
        .required('Type of gas is required')
    })
  })

  const handleDateChange = (date, values, dateSelector) => {
    values.diving_info[dateSelector] = moment(date).format()
  }

  return (
    <>
      <Modal
        visible={props.visibility}
        title='Edit diving info'
        onCancel={() => props.setModalVisibility('editDivingInfo', false)}
        footer={null}
      >
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{ guestId: props.guest._id, ...props.guest }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true)
            const updatedGuest = await updateGuest(values)
            setGuest(updatedGuest.data)
            setSubmitting(false)
            setModalVisibility('editDivingInfo', false)
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
              <FormInput type='text' placeholder='Cert. Agency' name='diving_info.certification_agency' onChange={handleChange} value={values.diving_info.certification_agency} />
              <FormInput type='text' placeholder='Cert. Nr' name='diving_info.certification_number' onChange={handleChange} value={values.diving_info.certification_number} />
              <DatePicker placeholder='Cert. Date' onChange={(date) => handleDateChange(date, values, 'certification_date')} />
              <FormInput type='text' placeholder='Cert. Rank' name='diving_info.certification_rank' onChange={handleChange} value={values.diving_info.certification_rank} />
              <DatePicker placeholder='Date last dive' onChange={(date) => handleDateChange(date, values, 'date_last_dive')} />
              <FormInput type='text' placeholder='Total dives' name='diving_info.total_dives' onChange={handleChange} value={values.diving_info.total_dives} />
              <Select error={errors.diving_info ? errors.diving_info.type_of_gas : null} items={[{ Air: 'Air', Nitrox: 'Nitrox' }]} placeholder='Type of gas' name='diving_info.type_of_gas' onChange={handleChange} value={values.diving_info.type_of_gas} />
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
    visibility: state.guestReducer.editDivingInfoModalVisibility
  }
}

const mapDispatchToProps = { setGuest, setModalVisibility }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditDivingInfoForm)
