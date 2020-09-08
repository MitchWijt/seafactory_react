import React, {useEffect} from 'react';
import Header from '../../components/header';
import {connect} from 'react-redux';
import {addGuests, addStaffWorking, addTodoToday, addWeather, setIsLoading} from '../../redux/actions/dashboardActions';
import LoadingCircle from '../../components/loadingCircle';
import ContentCircle from '../../components/contentCircle';
import moment from 'moment-timezone';
import axios from 'axios';
import Hr from '../../components/hr';
import {Row, Col} from 'antd';

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

    console.log(props.weather);

    return (
        <>
            <Header/>
            {props.isLoading ? <LoadingCircle color={'#000000'}/> : 
                <div className='container'>
                    <Row gutter={16}>
                        <Col span={8}>
                            <div className='content-container'>
                                <p className='content-container-title'>Staff today</p>
                                <div className='d-flex fd-row jc-center'>
                                    {props.staffWorking.map((staff) => <ContentCircle key={staff.initials} content={staff.initials} type='large'/>)}
                                </div>
                            </div>
                            <div className='content-container'>
                                <p className='content-container-title'>To do today</p>
                                {/* <div className='d-flex jc-center'> */}
                                    <ToDoTable data={props.toDoToday} titles={['Staff', 'Morning', 'Afternoon']}/>
                                {/* </div> */}
                            </div>
                        </Col>
                        <Col span={8}>
                           
                        </Col>
                        <Col span={8}>
        
                        </Col>
                    </Row>
                </div>
            }
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

const SingleDataTitle = (props) => {
    return (
        <>
            <th className='column-title'>{props.title}</th>
        </>
    )
}

const ToDoTable = (props) => {
    const ToDoTableColumn = (props) => {
        return (
            <tr className='table-data-row'>
                <td>
                    {props.staff.map((staff) => <span>{staff.name}</span>)}
                </td>
                {/* <td>{props.guest_info.name}</td>
                <td>{props.local ? 'true' : 'false'}</td>
                <td>{props.other_info.departure_date ? FormatDate(props.other_info.departure_date) : '-'}</td> */}
            </tr>
        )
    }

    return (
        <div className="container contentBox">
            <div className='table-body-data'>
            {props.data.length > 0 ? 
                <table className='table'>
                    <thead>
                        <tr>
                            {props.titles.map((title) => <SingleDataTitle key={title} title={title}/>)}
                        </tr>
                    </thead>
                    <tbody className='table-body-data'>
                        {props.data.map((data) => <ToDoTableColumn key={data._id} {...data}/>)}
                    </tbody>
                    
                </table>
            : 
            <div className='center'>
                <p id='no-results-text'>No results...</p>
            </div>
            }
            </div>
        </div>
    )
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
