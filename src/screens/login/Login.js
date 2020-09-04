import React from 'react';
import RegisterBackgroundImage from '../../components/registerBackgroundImage';
import Header from '../../components/header';
import Button from '../../components/button';
import FormInput from '../../components/formInput';
import {handleLogin} from '../../services/auth';
import {Formik} from 'formik';
import * as Yup from 'yup';


const Login = ({history}) => {

    // const handleClick = () => {
    //     localStorage.setItem('newUserStep', '2-password');
    //     history.push('/register');
    // }


    return (
        <>
            <Header/>
            <div className='container'>
                <div className='register-container'>
                    <div className="register-text">
                        <h1 className='heavy-title'>Login</h1>
                    </div>
                    <div className="register-box-container">
                        <RegisterBackgroundImage url='/assets/login_img.jpg'/>
                        <div className="register-text-container">
                            <div className='register-list-text'>
                                <h2 className='bold'>Admin login</h2>
                                <LoginForm/>
                            </div>
                        </div>
                    </div>                   
                </div>
            </div>
        </>
    )
}

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Must be 8 characters or more')
        .required('password is required'),
});

const LoginForm = () => {
    return (
        <>
            <Formik
                validateOnBlur={false}
                validateOnChange={false}
                initialValues={{email: '', password: ''}}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    await handleLogin(values);
                    // window.location.href = '/thank-you';
                    setSubmitting(false);
                }}
            >
                {({
                values,
                errors,
                handleChange,
                handleSubmit,
                }) => (
                <form onSubmit={handleSubmit}>
                    <FormInput type='email' placeholder='Email address' name='email' onChange={handleChange} value={values.email}/>
                    <span className='input-error'>{errors.email}</span>
                    <FormInput type='password' placeholder='Password' name='password' onChange={handleChange} value={values.password}/>
                    <span className='input-error'>{errors.password}</span>
                    <div className='register-cta-button'>
                        <Button type='submit' category='cta' fontType='bold' text='Continue' /> 
                    </div>     
                </form>
                )}
            </Formik>
        </>
    )
}

export default Login;