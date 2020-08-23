import React from 'react';
import '../style.css';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RegisterBackgroundImage from '../../../components/registerBackgroundImage';
import Button from '../../../components/button';

const OnePlans = (props) => {

    const handleClick = () => {
        localStorage.setItem('newUserStep', '1-plans');
        props.history.push('/register');
    }


    return (
        <>
            <div className='container'>
                <div className='register-container'>
                    <div className="register-text">
                        <p className='register-step-counter'>Step 1 of 4</p>
                        <h1 className='heavy-title'>Choose the best plan for your dive center</h1>
                    </div>
                                    
                </div>
            </div>
        </>
    )
}

export default OnePlans;