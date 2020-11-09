import React from 'react';

const EditCalendarItem = (props) => {
    console.log(props);
    return (
        <div style={{background: 'white', width: '100%', height: '100vh', position: 'absolute', zIndex: 3}}>
            <p>This is the render of the edit page</p>
        </div>
    )
}

export default EditCalendarItem;