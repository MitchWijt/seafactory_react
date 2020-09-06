import React, {useState} from 'react';
import '../style.css';
import LockIcon from '@material-ui/icons/Lock';
import PaymentIcon from '@material-ui/icons/Payment';
import RegisterBackgroundImage from '../../../components/registerBackgroundImage';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LoadingCircle from '../../../components/loadingCircle';
import axios from 'axios';
import {ReactComponent as Amex} from '../../../lib/img/paymentCard/amex.svg';
import Button from '../../../components/button';

const FourPayment = ({history}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        const res = await axios.post('/payment');
        window.location.href = res.data.checkoutUrl;
        // localStorage.setItem('newUserStep', '2-password');
        // history.push('/register');
    }


    return (
        <>
            <div className='container'>
                <div className='register-container'>
                    <div className="register-text">
                        <p className='register-step-counter'>Step 4 of 4</p>
                        <h1 className='heavy-title'>Set up your payment</h1>
                    </div>
                    <div className="register-box-container">
                        <RegisterBackgroundImage url='/assets/paymentImg.jpeg'/>
                        <div className="register-text-container">
                            <div className='register-list-text'>
                                <LockIcon className='register-list-item-icon large'/>
                                <p>Your membership starts as soon as you set up payment.</p>
                                <p className='bold'>No commitments. <br></br> Cancel online anytime.</p>
                             
                                {isLoading ? 
                                    <div className='register-cta-loading'>
                                       <LoadingCircle color={'#FF6F61'}/> 
                                   </div>
                                : 
                                    <div onClick={handleClick} className='register-cta-payment-button'>                
                                        <div className='register-cta-text-icon'>
                                            <span>Credit or Debit card</span><PaymentIcon className='register-cta-payment-icon'/>
                                        </div>
                                        <ChevronRightIcon className='register-cta-chevron'/>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>                   
                </div>
            </div>
        </>
    )
}

export default FourPayment;