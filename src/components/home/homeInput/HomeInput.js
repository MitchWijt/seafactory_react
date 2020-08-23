import React from 'react';
import './style.css';

const HomeInput = (props) => {
    return (
        <>
        <input className='homeInput' placeholder='E-mail address' type={props.type} name={props.name} value={props.value} onChange={props.onChange} onBlur={props.onBlur}/>
        {/* <p id='input-subtitle'>Enter your email to create or access your account.</p> */}
      </>
    )
}

export default HomeInput;