import React, { useEffect, useState } from 'react'
import { find } from 'lodash'

import '../style.css'
import { basicPlan } from '../../../services/premiumPackages'
import { choosePlan } from '../../../redux/actions/newAccountActions'
import { connect } from 'react-redux'
import Hr from '../../../components/hr'
import Button from '../../../components/button'
import { PlanCircle, PlanTitle } from '../style'
import { FlexContainer } from '../../../lib/styled-components'
import { getPaymentPlans } from '../../../services/api'
const OnePlans = (props) => {
  const { newUserSession, currentChosenPremiumPlan, choosePlan } = props
  const [plans, setPlans] = useState([])

  useEffect(() => {
    (async () => {
      const planItems = await getPaymentPlans()
      setPlans(planItems)
      choosePlan(planItems[0])
    })()

    if (newUserSession.premium_plan) {
      const premiumPlanTitle = newUserSession.premium_plan.title
      const activePlan = find(plans, { title: premiumPlanTitle }) || {}
      choosePlan(activePlan)
    } else {
      addPremiumPlanToNewUserSession(basicPlan)
    }

    // eslint-disable-next-line
  }, [choosePlan])

  const handleClick = () => {
    localStorage.setItem('newUserStep', '2-info')
    props.history.push('/register')
  }

  const handlePlanButtonClick = (id) => {
    const activePlan = find(plans, { _id: id }) || {}
    choosePlan(activePlan)
    addPremiumPlanToNewUserSession(activePlan)
  }

  const SinglePackageButton = (plan) => {
    return (
      <PlanCircle
        active={currentChosenPremiumPlan.title === plan.title}
        onClick={() => handlePlanButtonClick(plan._id)}
      >
        <PlanTitle>{plan.title}</PlanTitle>
      </PlanCircle>
    )
  }

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

  return (
    <>
      <div className='container'>
        <div className='register-medium-container'>
          <div className='register-text'>
            <p className='register-step-counter'>Step 1 of 4</p>
            <h1 className='heavy-title'>Choose the best plan for your dive center</h1>
          </div>
          <FlexContainer justify='space-between'>
            {/* {(premiumPackages || plans).map((plan) => <SinglePackageButton key={plan.title} {...plan} />)} */}
            {plans.map((plan) => <SinglePackageButton key={plan._id} {...plan} />)}
          </FlexContainer>
          <div className='register-plan-active-data-container'>
            <PaymentPlanDetails plan={currentChosenPremiumPlan} />
            {props.currentChosenPremiumPlan.title !== 'Premium' ? <p id='customerLimitExceeds'>*If customer limit gets exceeded its $2 extra per customer</p> : ''}
          </div>
          <Button
            onClick={handleClick}
            category='cta'
            fontType='bold'
            text='Continue'
            style={{ marginTop: 30 }}
          />
        </div>
      </div>
    </>
  )
}

const addPremiumPlanToNewUserSession = (premiumPlan) => {
  const currentSession = JSON.parse(localStorage.getItem('newUser'))
  const sessionData = { ...currentSession, premium_plan: premiumPlan }
  localStorage.setItem('newUser', JSON.stringify(sessionData))
}

const mapStateToProps = (state) => {
  return {
    currentChosenPremiumPlan: state.newAccountReducer.currentChosenPremiumPlan,
    newUserSession: JSON.parse(localStorage.getItem('newUser'))
  }
}

const mapDispatchToProps = { choosePlan }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnePlans)
