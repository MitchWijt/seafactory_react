import React from 'react';
import RegisterBackgroundImage from '../../components/registerBackgroundImage';
import Header from '../../components/header';
import Button from '../../components/button';
import FormInput from '../../components/formInput';
import {handleLogin} from '../../services/auth';
import {Link} from 'react-router-dom'
import {Formik} from 'formik';
import * as Yup from 'yup';


const Login = (props) => {
    return props.match.params.type === 'admin' ? <LoginAdmin/> : <LoginStaff/>;  
}

const LoginAdmin = () => {
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
                                <LoginFormAdmin/>
                                <p style={{fontSize:'16px', marginTop:'40px'}}>Click <Link to={'/login/staff'}>here</Link> for staff/shop login</p>
                            </div>
                        </div>
                    </div>                   
                </div>
            </div>
        </>
    )
}

const LoginStaff = () => {
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
                                <h2 className='bold'>Staff/Shop login</h2>
                                <LoginFormStaff/>
                                <p style={{fontSize:'16px', marginTop:'40px'}}>Click <Link to={'/login/admin'}>here</Link> for admin login</p>
                            </div>
                        </div>
                    </div>                   
                </div>
            </div>
        </>
    )
}



const LoginFormAdmin = () => {
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Must be 8 characters or more')
            .required('password is required'),
    });

    return (
        <>
            <Formik
                validateOnBlur={false}
                validateOnChange={false}
                initialValues={{email: '', password: ''}}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    await handleLogin(values, 'admin');
                    // window.location.href = '/dashboard';
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
                    <FormInput error={errors.email} type='email' placeholder='Email address' name='email' onChange={handleChange} value={values.email}/>
                    <FormInput error={errors.password} type='password' placeholder='Password' name='password' onChange={handleChange} value={values.password}/>
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


const LoginFormStaff = () => {
    const validationSchema = Yup.object({
        password: Yup.string()
            .min(6, 'Must be 6 characters')
            .required('password is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('email is required'),
    });
    
    return (
        <>
            <Formik
                validateOnBlur={false}
                validateOnChange={false}
                initialValues={{password: '', email: ''}}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    await handleLogin(values, 'staff');
                    // window.location.href = '/dashboard';
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
                    <FormInput error={errors.number} type='password' placeholder='Number' name='password' onChange={handleChange} value={values.password}/>
                    <FormInput errors={errors.email} type='text' placeholder='Email address' name='email' onChange={handleChange} value={values.email}/>
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