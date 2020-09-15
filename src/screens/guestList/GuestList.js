import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import urlParamsParser from '../../services/urlParamsParser';
import axios from 'axios';
import LoadingScreen from '../../components/loadingScreen';
import {setGuests} from '../../redux/actions/guestListActions';
import {setIsLoading} from '../../redux/actions/loadingActions';
import Button from '../../components/button';
import Header from '../../components/header';
import {FormatDate} from '../../services/dateFormatter';
import {Link} from 'react-router-dom';

const GuestList = (props) => {
    const {location, isLoading, guests, setIsLoading, setGuests} = props;

    useEffect(() => {
        const url = getReqUrlBasedOnParams(location.search);
        const getGuests = async () => {
            const res = await axios.get(url);
            
            setGuests(res.data);
            setIsLoading(false);
        }
        getGuests();
       
    }, [])

    return (
        <>
            <Header history={props.history}/>
            {isLoading ? <LoadingScreen/> : 
                <div className='container'>
                    <div className='content-container'>
                        <p className='content-container-title'>Guests</p>
                        <div style={{maxHeight: '420px'}} className='scroll-content-container'>
                            <GuestTable data={guests} titles={['Name', 'Local', 'Dep. Date', 'Marine tag', 'Checked in by', '']}/>
                        </div>
                    </div>
                </div>
            }      
        </>
    )
}

const GuestTable = (props) => {
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
                        {props.data.map((data) => <SingleColumn {...data}/>)}
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

const SingleColumn = (props) => {
    return (
        <tr className='table-data-row'>
            <td>{props.guest_info.name}</td>
            <td>{props.local ? 'Yes' : 'No'}</td>
            <td>{props.other_info.departure_date ? FormatDate(props.other_info.departure_date) : '-'}</td>
            <td>{props.other_info.marine_park_tag ? 'Yes' : 'No'}</td>
            <td>{props.registration.checked_in_by ? props.registration.checked_in_by : '-'}</td>
            <td><Link to={`/guest/${props._id}`}><Button type='submit' category='table-cta' fontSize={'14px'} fontType='bold' text='Open' /> </Link></td>
        </tr>
    )
}

const SingleDataTitle = (props) => {
    return (
        <>
            <th className='column-title'>{props.title}</th>
        </>
    )
}

const getReqUrlBasedOnParams = (params) => {
    const {name, dep_date} = urlParamsParser(params);
    if(name){
        return `/guest?name=${name}`;
    } else if(dep_date){
        return `/guest?dep_date=${dep_date}`
    } else {
        return `/guest`
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        userState: state.userStateReducer,
        isLoading: state.loadingReducer.isLoading,
        guests: state.guestListReducer.guests
    }
}

const mapDispatchToProps = {setGuests, setIsLoading};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GuestList)