import React, { useState } from 'react'
import Button from '../../../components/button'
import { Formik } from 'formik'
import FormInput from '../../../components/formInput'
import Select from '../../../components/select'
import Checkbox from '../../../components/checkbox'
import { countrySelectValues } from '../../../lib/countryData'
import * as Yup from 'yup'
import { createCompany } from '../../../services/api'

const formInitialValues = {
  companyName: '',
  locationName: '',
  address: '',
  country: '',
  contactMe: false
}

const validationSchema = Yup.object({
  companyName: Yup.string()
    .min(2, 'Must be 2 characters or more')
    .required('Dive center is required'),
  locationName: Yup.string()
    .min(2, 'Must be 2 characters or more')
    .required('Location is required'),
  address: Yup.string()
    .min(2, 'Must be 2 characters or more')
    .required('Address is required'),
  country: Yup.string()
    .required('Country is required')
})

const ThreeDiveCenter = (props) => {
  const { history } = props

  const onSubmit = async (values, { setSubmitting }) => {
    const { companyName, locationName, address, country } = values

    const companyDetails = {
      companyName,
      locationName,
      address,
      country,
      paymentPlanId: JSON.parse(localStorage.newUser).premium_plan._id
    }

    setSubmitting(true)
    createCompany(companyDetails)

    updateUserSession(values)
    history.push('/register')

    setSubmitting(false)
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
                  <FormInput error={errors.locationName} type='text' placeholder='Name of main location (you can add more later)' name='locationName' onChange={handleChange} value={values.locationName} />
                  <FormInput error={errors.address} type='text' placeholder='Address main location' name='address' onChange={handleChange} value={values.address} />
                  <Select error={errors.country} items={countrySelectValues} placeholder='Country main location' name='country' onChange={handleChange} value={values.country} />
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

const updateUserSession = (values) => {
  const currentSession = JSON.parse(localStorage.getItem('newUser'))
  localStorage.setItem('newUserStep', '4-payment')
  const newSessionObject = {
    ...currentSession,
    dive_center: values.companyName,
    locations: [values.locationName],
    dive_center_address: values.address,
    dive_center_country: values.country,
    receiveMail: values.contactMe
  }

  const sessionObject = JSON.stringify(newSessionObject)
  localStorage.setItem('newUser', sessionObject)
}

export default ThreeDiveCenter
