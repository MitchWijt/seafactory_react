import React from 'react'
import RegisterBackgroundImage from '../../components/registerBackgroundImage'
import Header from '../../components/header'
import Button from '../../components/button'
import FormInput from '../../components/formInput'
import { login } from '../../services/api'
import { Formik } from 'formik'
import * as Yup from 'yup'

const Login = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Must be 8 characters or more')
      .required('password is required')
  })

  const onSubmit = async ({ email, password }, { setSubmitting }) => {
    try {
      await login({ email, password })
      setSubmitting(true)
      window.location.href = '/dashboard'
      setSubmitting(false)
    } catch (e) {
      console.log(e.response.data.message)
    }
  }

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
                <>
                  <Formik
                    validateOnBlur={false}
                    validateOnChange={false}
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// const LoginForm = () => {

//   return (

//   )
// }

export default Login
