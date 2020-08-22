import React from 'react';
import {Input} from 'antd';
import './style.css';

const {Search} = Input;

const HomeInput = () => {
    return (
        <>
        <Search
        placeholder="Email"
        enterButton="Try it now"
        className='homeInput'
        size="large"
        onSearch={value => console.log(value)}
      />
      <p id='input-subtitle'>Enter your email to create or access your account.</p>
      </>
    )
}

export default HomeInput;