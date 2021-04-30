import React, { useEffect } from 'react'
import { Modal } from 'antd'
import { connect } from 'react-redux'
import { setModalVisibility, setCourses } from '../../../redux/actions/guestActions'
import { setCourseItems } from '../../../redux/actions/productItemsActions'
import Select from '../../../components/select'
import StaffMemberSelect from '../../../components/staffMemberSelect'
import Button from '../../../components/button'
import axios from 'axios'
import { Formik } from 'formik'
import Checkbox from '../../../components/checkbox'
import * as Yup from 'yup'

const MODAL_VISIBILITY_NAME = 'addCourse'

const validationSchema = Yup.object({
  title: Yup.string()
    .required('Type of course is required'),
  staff: Yup.string()
    .required('Staff is required')
})

const CourseModal = (props) => {
  useEffect(() => {
    const getCoursesProductCategory = async () => {
      const coursesCategory = await axios.get('/product/product-categories?title=Courses')
      props.setCourseItems(coursesCategory.data.items)
    }

    getCoursesProductCategory()
    // eslint-disable-next-line
  }, [])

  const courseItemsSelectValues = props.courseItems.map((item) => {
    const selectObject = {}
    selectObject[item.title] = item.title
    return selectObject
  })

  return (
    <>
      <Modal
        visible={props.visibility}
        title='Add course'
        onCancel={() => props.setModalVisibility(MODAL_VISIBILITY_NAME, false)}
        footer={null}
      >
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{ registrationId: props.guest.registration._id, title: '', staff: [], paid: false }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true)
            values.staff = values.staff.map(staffMemberObject => staffMemberObject.initials)
            const addCourseRequest = await axios.put('/registration-categories/courses', values)
            props.setCourses(addCourseRequest.data.courses)
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
              <Select error={errors.title} items={courseItemsSelectValues} placeholder='Type of course' name='title' onChange={handleChange} value={values.title} />
              <StaffMemberSelect error={errors.staff} formValues={values} name='staff' placeholder='Choose one or more staff' />
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
    courses: state.guestReducer.courses,
    visibility: state.guestReducer.coursesModalVisibility,
    courseItems: state.productItemsReducer.courseItems
  }
}

const mapDispatchToProps = { setModalVisibility, setCourses, setCourseItems }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseModal)
