import React, { useEffect } from 'react'
import { Modal } from 'antd'
import { connect } from 'react-redux'
import { setModalVisibility, setDives } from '../../../redux/actions/guestActions'
import { setDiveItems } from '../../../redux/actions/productItemsActions'
import Select from '../../../components/select'
import StaffMemberSelect from '../../../components/staffMemberSelect'
import Button from '../../../components/button'
import axios from 'axios'
import moment from 'moment-timezone'
import { Formik } from 'formik'
import Checkbox from '../../../components/checkbox'
import * as Yup from 'yup'
import { getProductCategory } from '../../../services/api';

const MODAL_VISIBILITY_NAME = 'addDive'

const validationSchema = Yup.object({
  dive_type: Yup.string()
    .required('Dive type is required'),
  staff: Yup.string()
    .required('Staff is required'),
  air_type: Yup.string()
    .required('Air type is required')
})

const DivesModal = (props) => {
  useEffect(() => {
    const getDiveProductCategory = async () => {
      const diveCategory = await getProductCategory('Dives')
      props.setDiveItems(diveCategory.data.items)
    }

    getDiveProductCategory()
    // eslint-disable-next-line
  }, [])

  const diveTypeItemsSelectValues = props.diveTypeItems.map((item) => {
    const selectObject = {}
    selectObject[item.title] = item.title
    return selectObject
  })

  return (
    <>
      <Modal
        visible={props.visibility}
        title='Add dive'
        onCancel={() => props.setModalVisibility(MODAL_VISIBILITY_NAME, false)}
        footer={null}
      >
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{ registrationId: props.guest.registration._id, dive_type: '', staff: [], air_type: '', paid: false, date: moment().format() }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true)
            values.staff = values.staff.map(staffMemberObject => staffMemberObject.initials)
            const addDiveRequest = await axios.put('/registration-categories/dives', values)
            props.setDives(addDiveRequest.data.dives)
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
              <Select error={errors.dive_type} items={diveTypeItemsSelectValues} placeholder='Type of dive' name='dive_type' onChange={handleChange} value={values.dive_type} />
              <StaffMemberSelect error={errors.staff} formValues={values} name='staff' placeholder='Choose one or more staff' />
              <Select error={errors.air_type} items={[{ Air_tank: 'Air tank', Nitrox_tank: 'Nitrox tank' }]} placeholder='Air type' name='air_type' onChange={handleChange} />
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
    dives: state.guestReducer.dives,
    visibility: state.guestReducer.divesModalVisibility,
    diveTypeItems: state.productItemsReducer.diveItems
  }
}

const mapDispatchToProps = { setModalVisibility, setDives, setDiveItems }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DivesModal)
