import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Button from '../../../components/button'
import { setAmountDue, setModalVisibility } from '../../../redux/actions/guestActions'
import { setStaffMembers } from '../../../redux/actions/staffActions'
import { getStaffMembersOfLoggedInDiveCenter } from '../../../services/dataFetchRequests/staffMembers'
import { parseArrayToSelectValues } from '../../../services/selectHelper'
import { getAmountDue } from '../../../services/checkoutGuest'
import axios from 'axios'
import FormInput from '../../../components/formInput'
import Select from '../../../components/select'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Modal } from 'antd'

const CheckoutModal = (props) => {
  useEffect(() => {
    const getStaffMembers = async () => {
      const staffMembers = await getStaffMembersOfLoggedInDiveCenter()
      props.setStaffMembers(staffMembers)
    }

    getStaffMembers()
    // eslint-disable-next-line
  }, [])
  const { setModalVisibility } = props

  const validationSchema = Yup.object({
    checked_out_by: Yup.string()
      .required('Checked out by is required')

  })

  const initialValues = {
    registrationId: props.guest.registration._id,
    checked_out_by: '',
    discount: 0,
    airTanks: 0,
    nxTanks: 0
  }

  const handleInputChange = async (values, air = 0, nitrox = 0, discount = 0) => {
    const amountDue = await getAmountDue(props.guest.registration._id, air, nitrox, discount)
    props.setAmountDue(amountDue)

    values.airTanks = air
    values.nxTanks = nitrox
    values.discount = discount
  }

  return (
    <>
      <Modal
        visible={props.visibility}
        title='Checkout guest'
        onCancel={() => props.setModalVisibility('checkoutModal', false)}
        footer={null}
      >
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true)
            await axios.put('/registration/checkout', values)
            setSubmitting(false)
            setModalVisibility('checkoutModal', false)
            window.location.reload()
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
              <FormInput type='number' placeholder='Additional air tanks' name='airTanks' onChange={(e) => handleInputChange(values, e.target.value, values.nxTanks, values.discount)} />
              <FormInput type='number' placeholder='Additional nx tanks' name='nxTanks' onChange={(e) => handleInputChange(values, values.airTanks, e.target.value, values.discount)} />
              <FormInput type='number' placeholder='Discount in %' name='discount' onChange={(e) => handleInputChange(values, values.airTanks, values.nxTanks, e.target.value)} />
              <Select error={errors.checked_out_by} items={parseArrayToSelectValues(props.staffMembers, '_id', 'name')} placeholder='Checked out by' name='checked_out_by' onChange={handleChange} value={values.checked_out_by} />
              <div className='d-flex jc-between'>
                <p style={{ fontSize: '1.5em' }}>Amount due:</p>
                <p className='bold' style={{ fontSize: '1.5em' }}>${props.amountDue}</p>
              </div>
              <div className='right'>
                <Button isLoading={isSubmitting} type='submit' category='cta' fontType='bold' text='Check out' />
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
    visibility: state.guestReducer.checkoutModalVisibility,
    amountDue: state.guestReducer.amountDue,
    staffMembers: state.staffReducer.staffMembers
  }
}

const mapDispatchToProps = { setModalVisibility, setAmountDue, setStaffMembers }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutModal)
