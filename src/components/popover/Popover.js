import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import './style.css';


const Popover = ({topOffset, content, visible}) => {
    let visibleClassName = visible ? 'popover-open' : '';

    return (
        <div id='popover' className={`popover ${visibleClassName}`} style={{top: `${topOffset}px`}}>
            <div className='container'>
                <div className='right'>
                    <CloseIcon style={{cursor: 'pointer', color: '#C4C0B6'}} onClick={() => closePopover()}/>
                </div>
                {content}
            </div>
        </div>
    )  
}

const closePopover = () => {
    document.getElementById('popover').classList.remove('popover-open');
}


Popover.propTypes = {
    topOffset: PropTypes.number.isRequired,
    content: PropTypes.any.isRequired
}

export default Popover;
