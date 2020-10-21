import React, {useEffect, createRef} from 'react';
import {
    setSelectedDate, 
    setCalendarItems, 
    setLoadingCalendarItems,
    setCalendarItemRefs,
    setCalendarItemPopover
} from '../../redux/actions/calendarActions';
import {setIsLoading} from '../../redux/actions/loadingActions';
import LoadingScreen from '../../components/loadingScreen';
import {Row, Col} from 'antd';
import Button from '../../components/button';
import Header from '../../components/header';
import ContentCard from '../../components/contentCard';
import ContentCircle from '../../components/contentCircle';
import LoadingCircle from '../../components/loadingCircle';
import {connect} from 'react-redux';
import axios from 'axios';
import moment from 'moment-timezone';
import CloseIcon from '@material-ui/icons/Close';
import { Calendar as DatePicker } from 'antd';
import Popover from '../../components/popover';
import './style.css';

const Calendar = (props) => {
    let {year, month, day} = props.match.params;

    useEffect(() => {
        const selectedDate = moment(`${year}${month}${day}`, 'YYYYMMDD').format("YYYY-MM-DD");
        props.setSelectedDate(moment(`${year}${month}${day}`, 'YYYYMMDD').format());

        const getCalendarItems = async () => {
            props.setLoadingCalendarItems(true);
            let calendarItemsReq = await axios.get(`/calendar?date=${selectedDate}`);

            props.setCalendarItemRefs(
                Array(calendarItemsReq.data.length)
                .fill(0)
                .map(() => createRef())
            )
            props.setCalendarItems(calendarItemsReq.data);
            props.setIsLoading(false);
            props.setLoadingCalendarItems(false);
        };

        getCalendarItems();
    }, [year, month, day]);

    const onDateSelect = (dateMomentObject)=> {
        let selectedYear = dateMomentObject.format('YYYY');
        let selectedMonth = dateMomentObject.format('MM');
        let selectedDay = dateMomentObject.format('DD');
        props.history.push({pathname: `/calendar/${selectedYear}/${selectedMonth}/${selectedDay}`});
    }

    const getCalendarItemPopoverContent = (calendarItem) => {
        let popoverContent = 
            <div>
                <div className='right'>
                    <CloseIcon style={{cursor: 'pointer', color: '#C4C0B6'}} onClick={() => props.setCalendarItemPopover('')}/>
                </div>
                <p className='content-container-title'>{calendarItem.title}</p>
            <p className='content-container-subtitle'>{`${moment(calendarItem.date).format("dddd")}, ${moment(calendarItem.date).format("MMMM")} ${moment(props.selectedDate).format("DD")}`}</p>
            </div>

        return popoverContent;
    }

    const openPopover = (calendarItem, index) => {
        let topOffsetCalendarItemPopup = props.calendarItemRefs[index].current.getBoundingClientRect().top + 147;
        let content = getCalendarItemPopoverContent(calendarItem);
        props.setCalendarItemPopover(<Popover topOffset={topOffsetCalendarItemPopup} content={content} visible={true}/>)
    }

    
    return (
        <>
            <Header/>
            {props.isLoading ? <LoadingScreen/> : 
                <div className='container'>
                    {console.log(props.calendarItemPopover)}
                    <Row gutter={16}>
                        <Col span={6}>
                            <Button type='button' category='cta' fontType='bold' text='Add item' /> 
                            <div className='calendar-date-picker' style={{marginTop: '30px'}}>
                                <DatePicker value={moment(props.selectedDate)} fullscreen={false} onSelect={onDateSelect} />
                            </div>
                        </Col>
                        <Col span={18}>
                            <h1 className='content-container-title'>{moment(props.selectedDate).format('MMMM DD YYYY')}</h1>
                            {props.isLoadingCalendarItems ? 
                                <div className='center' style={{marginTop: '30px'}}><LoadingCircle fontSize={50} color={'#FF6F61'}/></div> 
                            : 
                                <>
                                  {props.calendarItems.length < 1 ? 
                                        <div className='center' style={{marginTop: '30px'}}><p>No results...</p></div> 
                                    :
                                        <Row gutter={16}  style={{marginTop: '30px'}}>
                                            {props.calendarItems.map((calendarItem, i) => {
                                                return <>
                                                        <Col span={8}>
                                                            <ContentCard
                                                            parentRef={props.calendarItemRefs[i]}
                                                            onClick={() => openPopover(calendarItem, i)}
                                                            key={i} 
                                                            mainTitle={calendarItem.title} 
                                                            subTitle={`${moment(calendarItem.start_time).format('hh:mm A')}`}
                                                            topLeft={<StaffCircles staff={calendarItem.staff}/>}/>
                                                        </Col>
                                                        </>
                                            })}
                                        </Row>
                                    }
                                </>
                            }  
                        </Col>
                    </Row>
                    
                    

                </div>
                
            }
            {props.calendarItemPopover}
        </>
       
    )
}


const StaffCircles = (props) => {
    return (
        <>
            {props.staff.map((staff) => {
                return <ContentCircle key={staff.initials} content={staff.initials}/>
            })}
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
    setCalendarItemPopover
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Calendar);
