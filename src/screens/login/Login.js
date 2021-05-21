import React from 'react'
import RegisterBackgroundImage from '../../components/registerBackgroundImage'
import Header from '../../components/header'
import Button from '../../components/button'
import FormInput from '../../components/formInput'
import { handleLogin } from '../../services/auth'
import { Formik } from 'formik'
import * as Yup from 'yup'

const Login = (props) => {
  return (
    <>
      <Header />
      <div className='container'>
        <div className='register-container'>
          <div className='register-text'>
            <h1 className='heavy-title'>Login</h1>
          </div>
          <div className='register-box-container'>
            <RegisterBackgroundImage url='/assets/login_img.jpg' />
            <div className='register-text-container'>
              <div className='register-list-text'>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const LoginForm = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Must be 8 characters or more')
      .required('password is required')
  })

  return (
    <>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true)
          await handleLogin(values, 'admin')
          window.location.href = '/dashboard'
          setSubmitting(false)
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit
        }) => (
          <form onSubmit={handleSubmit}>
            <FormInput error={errors.email} type='email' placeholder='Email address' name='email' onChange={handleChange} value={values.email} />
            <FormInput error={errors.password} type='password' placeholder='Password' name='password' onChange={handleChange} value={values.password} />
            <div className='register-cta-button'>
              <Button type='submit' category='cta' fontType='bold' text='Continue' />
            </div>
          </form>
        )}
      </Formik>
    </>
  )
}

export default Login
