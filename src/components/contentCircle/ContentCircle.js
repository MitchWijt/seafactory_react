import React from 'react';
import './style.css';

const ContentCircle = (props) => {
    const className = props.type ? `circle circle-${props.type}` : 'circle circle-default';
    return (
        <div className={className}>
            <span className='circle-content'>{props.content}</span>
        </div>
    )
}

export default ContentCircle;