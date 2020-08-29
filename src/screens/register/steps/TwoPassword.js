import React from 'react';
import Button from '../../../components/button';

const TwoPassword = (props) => {
    return (
        <>
            <div className='container'>
                <div className='register-plans-container'>
                    <div className="register-text">
                        <p className='register-step-counter'>Step 2 of 4</p>
                        <h1 className='heavy-title'>Create a password to secure your account</h1>
                        <p>Just 3 more steps to go! Until you’re ready to bring your dive center to the next level! </p>
                    </div>
                    <div className='register-cta-button'>
                        <Button type='cta' fontType='bold' text='Continue'/>
                    </div>     
                </div>
            </div>
        </>
    )
}

export default TwoPassword;