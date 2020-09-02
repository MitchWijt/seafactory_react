import React from 'react';
import './style.css';

const HomeInput = (props) => {
    return (
      <>
        <input className='homeInput' placeholder='E-mail address' type={props.type} name={props.name} value={props.value} onChange={props.onChange} onBlur={props.onBlur}/>
      </>
    )
}

export default HomeInput;