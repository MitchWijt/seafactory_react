import React, {useEffect} from 'react';
import { Modal } from 'antd';
import {connect} from 'react-redux';
import {setRentalItems} from '../../../redux/actions/rentalItemsActions';
import {setInventoryItems} from '../../../redux/actions/inventoryActions';
import {setModalVisibility, setRentals} from '../../../redux/actions/guestActions';
import Button from '../../../components/button';
import Select from '../../../components/select';
import axios from 'axios';
import {Formik} from 'formik';
import Checkbox from '../../../components/checkbox';
import FormInput from '../../../components/formInput';
import moment from 'moment-timezone';
import DatePicker from '../../../components/datePicker';
import {parseArrayToSelectValues} from '../../../services/selectHelper';
import * as Yup from 'yup';

const MODAL_VISIBILITY_NAME = 'addRental';

const validationSchema = Yup.object({
    start_date: Yup.string()
        .required('Start date is required'),
    inventory: Yup.string()
        .required('Inventory is required'),
    location: Yup.string()
        .required('Dive center location is required'),
    rental_item: Yup.string()
        .required('Rental item is required')
});

const RentalModal = (props) => {
    useEffect(() => {
        const getRentalItems = async () => {
            const rentalItemsRequest = await axios.get('/rental-item');
            props.setRentalItems(rentalItemsRequest.data);
        }

        const getInventoryItems = async () => {
            const inventoryItemsRequest = await axios.get('/inventory');
            props.setInventoryItems(inventoryItemsRequest.data);
        }

        getRentalItems();  
        getInventoryItems();      
    }, []);

    const handleDateChange = (date, values, dateSelector) => {
        values[dateSelector] = moment(date).format();
    }

    const initialValues = {
        guest: props.guest._id, 
        rental_item: '',
        inventory: '', 
        start_date: '', 
        end_date: '', 
        location: '', 
        discount: null, 
        paid: false
    }

    return (
        <> 
            <Modal
                visible={props.visibility}
                title={'Add rental'}
                onCancel={() => props.setModalVisibility(MODAL_VISIBILITY_NAME, false)}
                footer={null}
            >
                <Formik
                    validateOnBlur={false}
                    validateOnChange={false}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        setSubmitting(true);
                        await axios.post('/rentals', values);

                        const guestRentalsData = await axios.get(`/rentals?guestId=${props.guest._id}`);
                        props.setRentals(guestRentalsData.data);
                        props.setModalVisibility(MODAL_VISIBILITY_NAME, false);
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
                        <DatePicker error={errors.start_date} placeholder='Start date' onChange={(date) => handleDateChange(date, values, 'start_date')}/>
                        <DatePicker placeholder='End date' onChange={(date) => handleDateChange(date, values, 'end_date')}/>
                        <Select error={errors.rental_item} items={parseArrayToSelectValues(props.rentalItems, '_id', 'title')} placeholder='Rental item' name='rental_item' onChange={handleChange} value={values.rental_item}/>
                        <Select error={errors.inventory} items={parseArrayToSelectValues(props.inventoryItems, '_id', 'title')} placeholder='Inventory item' name='inventory' onChange={handleChange} value={values.inventory}/>
                        <Select error={errors.locarion} items={parseArrayToSelectValues(props.diveCenterLocations)} placeholder='Dive center location' name='location' onChange={handleChange} value={values.location}/>
                        <FormInput type='number' placeholder='Discount' name='discount' onChange={handleChange} value={values.discount}/>
                        <Checkbox label='Guest has paid' name='paid'/>
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
        diveCenterLocations: state.userStateReducer.user.locations,
        visibility: state.guestReducer.rentalModalVisibility,
        rentalItems: state.rentalItemsReducer.rentalItems,   
        inventoryItems: state.inventoryReducer.inventoryItems     
    }
}

const mapDispatchToProps = {setModalVisibility, setRentals, setInventoryItems, setRentalItems}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RentalModal)