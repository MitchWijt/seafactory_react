import React, {useEffect, createRef} from 'react';
import {
    setSelectedDate, 
    setCalendarItems, 
    setLoadingCalendarItems,
    setCalendarItemRefs,
    setCalendarItemPopover,
    setAddCalendarItemModalVisibility
} from '../../redux/actions/calendarActions';
import {setIsLoading} from '../../redux/actions/loadingActions';
import LoadingScreen from '../../components/loadingScreen';
import Header from '../../components/header';
import {connect} from 'react-redux';
import axios from 'axios';
import moment from 'moment-timezone';
import RenderCalendar from './RenderCalendar';
import './style.css';

const Calendar = (props) => {
    let {year, month, day} = props.match.params;

    useEffect(() => {
        props.setSelectedDate(moment(`${year}${month}${day}`, 'YYYYMMDD').format());
        fetchCalendarItems()
    }, [year, month, day]);

    const handleResponse = (response) => {
        const {data} = response;
        props.setCalendarItemRefs(
            Array(data.length)
            .fill(0)
            .map(() => createRef())
        )
        props.setCalendarItems(data);
    }

    const fetchCalendarItems = async () => {
        props.setLoadingCalendarItems(true);
        const selectedDate = moment(`${year}${month}${day}`, 'YYYYMMDD').format("YYYY-MM-DD");
        const response = await axios.get(`/calendar?date=${selectedDate}`);
        handleResponse(response);
        props.setIsLoading(false);
        props.setLoadingCalendarItems(false);
    }

    return (
        <>
            <Header/>
            {props.isLoading ? <LoadingScreen/> : <RenderCalendar {...props}/>}
        </>
       
    )
}

const mapStateToProps = (state) => {
    return {
        calendarItems: state.calendarReducer.calendarItems,
        selectedDate: state.calendarReducer.selectedDate,
        calendarItemRefs: state.calendarReducer.calendarItemRefs,
        calendarItemPopover: state.calendarReducer.calendarItemPopover,
        isLoadingCalendarItems: state.calendarReducer.isLoadingCalendarItems,
        isLoading : state.loadingReducer.isLoading
    }
}

const mapDispatchToProps = {
    setSelectedDate, 
    setCalendarItems, 
    setIsLoading, 
    setLoadingCalendarItems, 
    setCalendarItemRefs,
    setCalendarItemPopover,
    setAddCalendarItemModalVisibility
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Calendar);
