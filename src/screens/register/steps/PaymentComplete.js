import React, {useState} from 'react';
import '../style.css';
import FormInput from '../../../components/formInput';
import DatePicker from '../../../components/datePicker';
import {Formik} from 'formik';
import Button from '../../../components/button';
import {connect} from 'react-redux';
import moment from 'moment-timezone';
import axios from 'axios';
import * as Yup from 'yup';

const formInitialValues = {
    firstname: '',
    lastname: '',
    dateOfBirth: '',
}

const validationSchema = Yup.object({
    firstname: Yup.string()
        .min(2, 'Must be 2 characters or more')
        .required('Firstname is required'),
    lastname: Yup.string()
        .min(2, 'Must be 2 characters or more')
        .required('Lastname is required'),
    dateOfBirth: Yup.date()
        .required('Date of birth is required'),
});

const PaymentComplete = (props) => {
    const [dateOfBirth, setDateOfBirth] = useState('');

    const handleDateChange = (date, values) => {
        values.dateOfBirth = date;
        setDateOfBirth(date);
    }

    const submitForm = async (values) => {
        let formData = {
            ...props.userState.user,
            firstname: values.firstname,
            lastname: values.lastname,
            dateOfBirth: moment(values.dateOfBirth).format()
        }
        await axios.put('/user/update', formData);
    }
    
    return (
        <>
            <div className='container'>
                <div className='register-medium-container'>
                    <div className="register-text">
                        <h1 className='heavy-title'>Thank you for your business with us!</h1>
                        <p>Before you can enjoy all the benefits of the system. We would like some personal information from you to keep in touch, regarding payments and news. </p>
                    </div>
                    <div>
                        <Formik
                            initialValues={formInitialValues}
                            validateOnBlur={false}
                            validateOnChange={false}
                            validationSchema={validationSchema}
                            onSubmit={async (values, { setSubmitting }) => {
                                values.dateOfBirth = dateOfBirth;
                                setSubmitting(true);
                                await submitForm(values);
                                setSubmitting(false);  
                            }}
                        >
                            {({
                            values,
                            errors,
                            isSubmitting,
                            handleChange,
                            handleSubmit,
                            }) => (
                            <form onSubmit={handleSubmit}>
                                <FormInput error={errors.firstname} type='text' placeholder='Firstname' name='firstname' onChange={handleChange} value={values.firstname}/>
                                <FormInput error={errors.lastname} type='text' placeholder='Lastname' name='lastname' onChange={handleChange} value={values.lastname}/>  
                                <DatePicker error={errors.dateOfBirth} placeholder='Date of birth' onChange={(date) => handleDateChange(date, values)} value={dateOfBirth}/>
                                <div className='register-cta-button'>
                                   <Button isLoading={isSubmitting} type='submit' category='cta' fontType='bold' text='Finish' /> 
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

const mapStateToProps = (state) => {
    return {
        userState: {...state.userStateReducer}
    }
}

export default connect(
    mapStateToProps
)(PaymentComplete);