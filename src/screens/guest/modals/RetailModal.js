import React, { useEffect } from 'react'
import { Modal } from 'antd'
import { connect } from 'react-redux'
import { setRetailItems } from '../../../redux/actions/productItemsActions'
import { setModalVisibility, setRetail } from '../../../redux/actions/guestActions'
import Button from '../../../components/button/Button'
import Select from '../../../components/select/Select'
import { Formik } from 'formik'
import Checkbox from '../../../components/checkbox/Checkbox'
import * as Yup from 'yup'
import { getProductCategory, putRegistrationCategoriesRetail } from '../../../services/api'

const MODAL_VISIBILITY_NAME = 'addRetail'

const validationSchema = Yup.object({
  title: Yup.string()
    .required('Retail item is required')
})

const RetailModal = (props) => {
  useEffect(() => {
    const getRetailProductCategory = async () => {
      const retailCategory = await getProductCategory('Retail')
      props.setRetailItems(retailCategory.data.items)
    }

    getRetailProductCategory()
    // eslint-disable-next-line
  }, [])

  const retailItemsSelectValues = props.retailItems.map((item) => {
    const selectObject = {}
    selectObject[item.title] = item.title
    return selectObject
  })

  return (
    <>
      <Modal
        visible={props.visibility}
        title='Add retail item'
        onCancel={() => props.setModalVisibility(MODAL_VISIBILITY_NAME, false)}
        footer={null}
      >
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{ registrationId: props.guest.registration._id, title: '', paid: false }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true)
            const addRetailRequest = putRegistrationCategoriesRetail(values)
            props.setRetail(addRetailRequest.data.retail)
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
              <Select error={errors.title} items={retailItemsSelectValues} placeholder='Retail item' name='title' onChange={handleChange} value={values.title} />
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
    retail: state.guestReducer.retail,
    visibility: state.guestReducer.retailModalVisibility,
    retailItems: state.productItemsReducer.retailItems
  }
}

const mapDispatchToProps = { setModalVisibility, setRetail, setRetailItems }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RetailModal)
