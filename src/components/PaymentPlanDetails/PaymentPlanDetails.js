import React from 'react'
import Hr from '../hr/Hr'

const PaymentPlanDetails = (props) => {
  const { monthlyPrice, locations, maxCustomers } = props?.plan || {}
  return (
    <>
      <div className='register-plan-single-active-data'>
        <span className='register-plan-single-text'>Monthly price</span>
        <span className='bold register-plan-single-text'>&euro;{Number(monthlyPrice || 0).toFixed(0)}</span>
      </div>
      <Hr />
      <div className='register-plan-single-active-data'>
        <span className='register-plan-single-text'>Amount of dive center locations</span>
        <span className='bold register-plan-single-text'>{locations}</span>
      </div>
      <Hr />
      <div className='register-plan-single-active-data'>
        <span className='register-plan-single-text'>New customers / Month</span>
        <span className='bold register-plan-single-text'>{maxCustomers}</span>
      </div>
    </>
  )
}

export default PaymentPlanDetails
