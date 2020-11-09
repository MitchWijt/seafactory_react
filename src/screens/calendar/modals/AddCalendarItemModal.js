import React from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import {Formik} from 'formik';
import { Modal } from 'antd';
import FormInput from '../../../components/formInput';
import Select from '../../../components/select';
import {parseArrayToSelectValues} from '../../../services/selectHelper';
import DatePicker from '../../../components/datePicker';
import StaffMemberSelect from '../../../components/staffMemberSelect';
import Button from '../../../components/button';
import {connect} from 'react-redux';
import moment from 'moment-timezone';
import {setAddCalendarItemModalVisibility} from '../../../redux/actions/calendarActions';

  
const AddCalendarItemModal = (props) => {
    const validationSchema = Yup.object({
        // checked_out_by: Yup.string()
        //     .required('Checked out by is required')
        
    });

    const initialFormValues = {
        title: '',
        date: props.selectedDate,
        start_time: '2020-06-03T13:43:02.049+00:00',
        end_time: '2020-06-03T15:43:02.049+00:00',
        category: '',
        staff: '',
        description: ''
    }

    const handleDateChange = (date, values, dateSelector) => {
        values[dateSelector] = moment(date).format();
    }


    return (
        <Modal
        visible={props.visibility}
        title='Add calendar item'
        onCancel={() => props.setAddCalendarItemModalVisibility(false)}
        footer={null}
        >
            <Formik
                validateOnBlur={false}
                validateOnChange={false}
                initialValues={initialFormValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    values.staff = values.staff.map(staffMemberObject => staffMemberObject.id);
                    await axios.post('/calendar', values);
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
                    <FormInput type='text' placeholder='Title' name='title' onChange={handleChange} />
                    <StaffMemberSelect formValues={values} placeholder='Staff members' name='staff'/>
                    <Select items={parseArrayToSelectValues(props.calendarItemCategories, '_id', 'title')} placeholder='Category' name='category' onChange={handleChange} value={values.category}/>
                    <DatePicker defaultValue={props.selectedDate} placeholder='Date of activity' onChange={(date) => handleDateChange(date, values, 'date')}/>

                    <div className='right'>
                        <Button isLoading={isSubmitting} type='submit' category='cta' fontType='bold' text='Check out' /> 
                    </div>     
                </form>
                )}
            </Formik>
        </Modal>
    )
}

const mapStateToProps = (state) => {
    return {
        visibility: state.calendarReducer.addCalendarItemModalVisibility,
        calendarItemCategories: state.calendarReducer.calendarItemCategories,
        selectedDate: state.calendarReducer.selectedDate
    }
}

const mapDispatchToProps = {setAddCalendarItemModalVisibility}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCalendarItemModal)