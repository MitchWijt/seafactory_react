import React from 'react'
import Button from '../../../components/button/Button'
import { Formik } from 'formik'
import FormInput from '../../../components/formInput/FormInput'
import { connect } from 'react-redux'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  firstName: Yup.string()
    .required('First Name is required'),
  lastName: Yup.string()
    .required('Last Name is required'),
  password: Yup.string()
    .min(8, 'Must be 8 characters or more')
    .required('password is required')
})

const TwoPassword = (props) => {
  const { newUserSession } = props

  return (
    <>
      <div className='container'>
        <div className='register-medium-container'>
          <div className='register-text'>
            <p className='register-step-counter'>Step 2 of 4</p>
            <h1 className='heavy-title'>Create a password to secure your account</h1>
            <p>Just 3 more steps to go! Until you’re ready to bring your dive center to the next level! </p>
          </div>
          <div className=''>
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              initialValues={{ email: newUserSession.email, password: '' }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                const { email, password, firstName, lastName } = values
                const newSessionObject = {
                  ...newUserSession,
                  email,
                  password,
                  firstName,
                  lastName
                }
                addUserInfoToLocalStorage(newSessionObject)

                setSubmitting(false)
                localStorage.setItem('newUserStep', '3-dive-center')
                props.history.push('/register')
              }}
            >
              {({
                values,
                errors,
                handleChange,
                handleSubmit
              }) => (
                <form onSubmit={handleSubmit}>
                  <FormInput error={errors.firstName} type='text' placeholder='First Name' name='firstName' onChange={handleChange} value={values.firstName} />
                  <FormInput error={errors.lastName} type='text' placeholder='Last Name' name='lastName' onChange={handleChange} value={values.lastName} />
                  <FormInput error={errors.email} type='email' placeholder='Email address' name='email' onChange={handleChange} value={values.email} />
                  <FormInput error={errors.password} type='password' placeholder='Password' name='password' onChange={handleChange} value={values.password} />
                  <div className='register-cta-button'>
                    <Button type='submit' category='cta' fontType='bold' text='Continue' />
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

const addUserInfoToLocalStorage = (newSessionObject) => {
  localStorage.setItem('newUser', JSON.stringify(newSessionObject))
}

const mapStateToProps = () => {
  return {
    newUserSession: JSON.parse(localStorage.getItem('newUser'))
  }
}

export default connect(
  mapStateToProps
)(TwoPassword)
