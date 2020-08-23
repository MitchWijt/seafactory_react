import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const HomeInputButton = (props) => {
    return (
        <button className='homeInputButton' type={props.type} disabled={props.disabled}>{props.title}</button>
    )
}

HomeInputButton.propTypes = {
    title : PropTypes.string
}

export default HomeInputButton;