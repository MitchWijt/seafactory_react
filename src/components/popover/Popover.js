import React from 'react';
import PropTypes from 'prop-types';
import './style.css';


const Popover = ({topOffset, content, visible}) => {
    let visibleClassName = visible ? 'popover-open' : '';

    return (
        <div className={`popover ${visibleClassName}`} style={{top: `${topOffset}px`}}>
            <div className='container'>
                {content}
            </div>
        </div>
    )
}

Popover.propTypes = {
    topOffset: PropTypes.number.isRequired,
    content: PropTypes.isRequired
}

export default Popover;
