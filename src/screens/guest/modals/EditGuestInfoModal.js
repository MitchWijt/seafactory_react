import React from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/button';
import {setGuest, setModalVisibility} from '../../../redux/actions/guestActions';
import axios from 'axios';
import moment from 'moment-timezone';
import FormInput from '../../../components/formInput';
import Select from '../../../components/select';
import DatePicker from '../../../components/datePicker';
import * as Yup from 'yup';
import {Formik} from 'formik';
import { Modal } from 'antd';
import {countrySelectValues} from '../../../lib/countryData';

const EditGuestInfoModal = (props) => {
    const {setGuest, setModalVisibility} = props;

    const validationSchema = Yup.object({
        guest_info: Yup.object({
            name: Yup.string()
                .min(2, 'Must be atleast 2 characters long')
                .required('Name is required'),
            email: Yup.string()
                .email('Invalid email address')
                .min(2, 'Must be atleast 2 characters long')
                .required('Email is required'),
            phone: Yup.string()
                .min(2, 'Must be atleast 2 characters long')
                .required('Phone number is required')
        })
    });

    const handleDateChange = (date, values) => {
        values.guest_info.date_of_birth = moment(date).format();
    }

    return (
        <>
            <Modal
                visible={props.visibility}
                title='Edit guest info'
                onCancel={() => props.setModalVisibility('editGuestInfo', false)}
                footer={null}
            >
                <Formik
                    validateOnBlur={false}
                    validateOnChange={false}
                    initialValues={{guestId: props.guest._id, ...props.guest}}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);
                        let updatedGuest = await axios.put('/guest', values);
                        setGuest(updatedGuest.data);
                        setSubmitting(false);
                        setModalVisibility('editGuestInfo', false);
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
                        <FormInput error={errors.guest_info ? errors.guest_info.name : null} type='text' placeholder='Name' name='guest_info.name' onChange={handleChange} value={values.guest_info.name}/>
                        <FormInput error={errors.guest_info ? errors.guest_info.email : null} type='text' placeholder='Email' name='guest_info.email' onChange={handleChange} value={values.guest_info.email}/>
                        <Select items={countrySelectValues} placeholder='Country' name='guest_info.country' onChange={handleChange} value={values.guest_info.country}/>
                        <FormInput type='text' placeholder='Address' name='guest_info.address' onChange={handleChange} value={values.guest_info.address}/>
                        <FormInput type='text' placeholder='Zipcode' name='guest_info.zipcode' onChange={handleChange} value={values.guest_info.zipcode}/>
                        <FormInput type='text' placeholder='City' name='guest_info.city' onChange={handleChange} value={values.guest_info.city}/>
                        <FormInput error={errors.guest_info ? errors.guest_info.phone : null} type='text' placeholder='Phone' name='guest_info.phone' onChange={handleChange} value={values.guest_info.phone}/>
                        <DatePicker placeholder='Date of birth' onChange={(date) => handleDateChange(date, values)}/>
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
        visibility: state.guestReducer.editGuestInfoModalVisibility
    }
}

const mapDispatchToProps = {setGuest, setModalVisibility};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditGuestInfoModal)