import React from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import {Formik} from 'formik';
import { Modal } from 'antd';
import {connect} from 'react-redux';
import {setAddCalendarItemModalVisibility} from '../../../redux/actions/calendarActions';


const AddCalendarItemModal = (props) => {
    return (
        <Modal
        visible={props.visibility}
        title='Add calendar item'
        onCancel={() => props.setAddCalendarItemModalVisibility(false)}
        footer={null}
        >
            <p>fhjsjshdf</p>
            {/* <Formik
                validateOnBlur={false}
                validateOnChange={false}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    await axios.put('/registration/checkout', values);
                    setSubmitting(false);
                    setModalVisibility('checkoutModal', false);
                    window.location.reload();
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
                    <FormInput type='number' placeholder='Additional air tanks' name='airTanks' onChange={(e) => handleInputChange(values, e.target.value, values.nxTanks, values.discount)} />
                    <FormInput type='number' placeholder='Additional nx tanks' name='nxTanks' onChange={(e) => handleInputChange(values, values.airTanks, e.target.value, values.discount)}/>
                    <FormInput type='number' placeholder='Discount in %' name='discount' onChange={(e) => handleInputChange(values, values.airTanks, values.nxTanks, e.target.value)}/>
                    <Select error={errors.checked_out_by} items={parseArrayToSelectValues(props.staffMembers, '_id', 'name')} placeholder='Checked out by' name='checked_out_by' onChange={handleChange} value={values.checked_out_by}/>
                    <div className='d-flex jc-between'>
                        <p style={{fontSize: '1.5em'}}>Amount due:</p>
                        <p className='bold' style={{fontSize: '1.5em'}}>${props.amountDue}</p>
                    </div>
                    <div className='right'>
                        <Button isLoading={isSubmitting} type='submit' category='cta' fontType='bold' text='Check out' /> 
                    </div>     
                </form>
                )}
            </Formik> */}
        </Modal>
    )
}

const mapStateToProps = (state) => {
    return {
        visibility: state.calendarReducer.addCalendarItemModalVisibility
    }
}

const mapDispatchToProps = {setAddCalendarItemModalVisibility}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCalendarItemModal)