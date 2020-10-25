import React from 'react';
import moment from 'moment-timezone';
import DescriptionIcon from '@material-ui/icons/Description';
import Popover from '../../components/popover';

const getCalendarItemPopoverContent = (calendarItem) => {
    return (
        <div>
            <p className='content-container-title'>{calendarItem.title}</p>
            <p className='content-container-subtitle'>{`${moment(calendarItem.date).format("dddd")}, ${moment(calendarItem.date).format("MMMM")} ${moment(calendarItem.date).format("DD")}`}</p>
            <div className="d-flex">
                <DescriptionIcon style={{color: '#C4C0B6', marginRight: '10px'}}/><p className='popover-content-text'>{calendarItem.description ? calendarItem.description : 'No description'}</p>
            </div>
        </div>
    )
}

export const getCalendarItemPopover = (calendarItem, calendarItemRef) => {
    let topOffsetCalendarItemPopup = calendarItemRef.current.getBoundingClientRect().top + 147;
    let content = getCalendarItemPopoverContent(calendarItem);
    return <Popover topOffset={topOffsetCalendarItemPopup} content={content} visible={true}/>;
}