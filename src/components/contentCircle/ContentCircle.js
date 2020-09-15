import React from 'react';
import './style.css';

const ContentCircle = (props) => {
    const className = props.type ? `circle circle-${props.type}` : 'circle circle-default';
    return (
        <div className={className}>{props.content}</div>
    )
}

export default ContentCircle;