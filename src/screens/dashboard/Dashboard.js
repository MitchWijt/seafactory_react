import React, {useEffect} from 'react';
import Header from '../../components/header';
import {connect} from 'react-redux';
import {addGuests, addStaffWorking, addTodoToday, addWeather, setIsLoading} from '../../redux/actions/dashboardActions';
import LoadingCircle from '../../components/loadingCircle';
import moment from 'moment-timezone';
import axios from 'axios';

const Dashboard = (props) => {
    useEffect(() => {
        props.setIsLoading(true);
        const fetchDashboardData = async () => {
            await fetchWeatherData(props.addWeather);
            await fetchStaffWorking(props.addStaffWorking);
            await fetchToDoToday(props.addTodoToday);
            await fetchGuestsCheckingOut(props.addGuests);
            props.setIsLoading(false);
        }

        fetchDashboardData();
    }, []);

    return (
        <>
            <Header/>
            {props.isLoading ? <LoadingCircle color={'#000000'}/> : <p>{props.weather.current.temperature}</p>}
        </>
    )
}

const fetchGuestsCheckingOut = async (addGuests) => {
    const guestsCheckingOutResponse = await axios.get(`/guest?dep_date=${moment().format('YYYY-MM-DD')}`);
    addGuests(guestsCheckingOutResponse.data);
}

const fetchToDoToday = async (addToDoToday) => {
    const toDoTodayResponse = await axios.get(`/calendar?date=${moment().format('YYYY-MM-DD')}`);
    addToDoToday(toDoTodayResponse.data);
}

const fetchStaffWorking = async (addStaffWorking) => {
    const staffWorkingResponse = await axios.get('/staff?workingToday=true');
    addStaffWorking(staffWorkingResponse.data);
}

const fetchWeatherData = async (addWeather) => {
    const weatherResponse = await axios.get('/weather?location=Kralendijk, Bonaire');
    const forecastData = weatherResponse.data[0];
    addWeather(forecastData);
}


const mapStateToProps = (state) => {
    return {
        weather: state.dashboardReducer.weather,
        staffWorking: state.dashboardReducer.staffWorking,
        toDoToday: state.dashboardReducer.toDoToday,
        guestsCheckingOut: state.dashboardReducer.guestsCheckingOut,
        isLoading: state.dashboardReducer.isLoading
    }
}

const mapDispatchToProps = {addGuests, addStaffWorking, addTodoToday, addWeather, setIsLoading};

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Dashboard);
