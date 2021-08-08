import React from 'react'
import '../style.css'
import LockIcon from '@material-ui/icons/Lock'
import RegisterBackgroundImage from '../../../components/registerBackgroundImage'
import StripeCheckout from '../../../components/StripeCheckout/StripeCheckout'

const FourPayment = ({ history }) => {
  return (
    <>
      <div className='container'>
        <div className='register-container'>
          <div className='register-text'>
            <p className='register-step-counter'>Step 4 of 4</p>
            <h1 className='heavy-title'>Set up your payment</h1>
          </div>
          <div className='register-box-container'>
            <RegisterBackgroundImage url='/assets/paymentImg.jpeg' />
            <div className='register-text-container'>
              <div className='register-list-text'>
                <LockIcon className='register-list-item-icon large' />
                <p>Your membership starts as soon as you set up payment.</p>
                <p className='bold'>No commitments. <br /> Cancel online anytime.</p>
                <StripeCheckout />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FourPayment
