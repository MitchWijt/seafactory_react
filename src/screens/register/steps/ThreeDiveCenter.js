import React, { useState } from 'react'
import Button from '../../../components/button'
import { Formik } from 'formik'
import FormInput from '../../../components/formInput'
import Select from '../../../components/select'
import Checkbox from '../../../components/checkbox'
import { countrySelectValues } from '../../../lib/countryData'
import * as Yup from 'yup'
import { registerStore, setToken } from '../../../services/api'

const formInitialValues = {
  companyName: '',
  diveCenterLocations: '',
  addressMainLocation: '',
  countryMainLocation: '',
  contactMe: false
}

const validationSchema = Yup.object({
  companyName: Yup.string()
    .min(2, 'Must be 2 characters or more')
    .required('Dive center is required'),
  diveCenterLocations: Yup.string()
    .min(2, 'Must be 2 characters or more')
    .required('Location is required'),
  addressMainLocation: Yup.string()
    .min(2, 'Must be 2 characters or more')
    .required('Address is required'),
  countryMainLocation: Yup.string()
    .required('Country is required')
})

const ThreeDiveCenter = (props) => {
  const { history } = props
  const [contactMe, setContactMe] = useState(false)

  const handleContactMe = () => {
    setContactMe(!contactMe)
  }

  const onSubmit = async (values, { setSubmitting }) => {
    values.receiveMail = contactMe
    // setSubmitting(true)
    // await submitNewUserForm(values, history)
    // setSubmitting(false)
  }
  return (
    <>
      <div className='container'>
        <div className='register-medium-container'>
          <div className='register-text'>
            <p className='register-step-counter'>Step 3 of 4</p>
            <h1 className='heavy-title'>Tell us something about your dive center!</h1>
          </div>
          <div>
            <Formik
              initialValues={formInitialValues}
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({
                values,
                errors,
                isSubmitting,
                handleChange,
                handleSubmit
              }) => (
                <form onSubmit={handleSubmit}>
                  <FormInput error={errors.companyName} type='text' placeholder='Company name' name='companyName' onChange={handleChange} value={values.companyName} />
                  <FormInput error={errors.diveCenterLocations} type='text' placeholder='Name of main location (you can add more later)' name='diveCenterLocations' onChange={handleChange} value={values.diveCenterLocations} />
                  <FormInput error={errors.addressMainLocation} type='text' placeholder='Address main location' name='addressMainLocation' onChange={handleChange} value={values.addressMainLocation} />
                  <Select error={errors.countryMainLocation} items={countrySelectValues} placeholder='Country main location' name='countryMainLocation' onChange={handleChange} value={values.countryMainLocation} />
                  <Checkbox label='SeaFactory is allowed to contact me by email with info regarding my account' name='contactMe' onChange={handleContactMe} />
                  <div className='register-cta-button'>
                    <Button isLoading={isSubmitting} type='submit' category='cta' fontType='bold' text='Continue' />
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  )
}

const submitNewUserForm = async (values, history) => {
  updateUserSession(values)

  const formData = getFormDataFromUserSession()

  try {
    const data = await registerStore(formData)
    await setToken(data.jwt)

    localStorage.setItem('newUserStep', '4-payment')
    history.push('/register')
  } catch (e) {
    console.log(e.response.data.description)
  }
}

const getFormDataFromUserSession = () => {
  return JSON.parse(localStorage.getItem('newUser'))
}

const updateUserSession = (values) => {
  const currentSession = JSON.parse(localStorage.getItem('newUser'))

  const newSessionObject = {
    ...currentSession,
    dive_center: values.companyName,
    locations: [values.diveCenterLocations],
    dive_center_address: values.addressMainLocation,
    dive_center_country: values.countryMainLocation,
    receiveMail: values.contactMe
  }

  const sessionObject = JSON.stringify(newSessionObject)
  localStorage.setItem('newUser', sessionObject)
}

export default ThreeDiveCenter
