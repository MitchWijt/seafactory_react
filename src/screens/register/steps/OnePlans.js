import React, { useEffect } from 'react'
import '../style.css'
import { premiumPackages, basicPlan, standardPlan, premiumPlan } from '../../../services/premiumPackages'
import { choosePlan } from '../../../redux/actions/newAccountActions'
import { connect } from 'react-redux'
import Hr from '../../../components/hr'
import Button from '../../../components/button'
import { PlanCircle, PlanTitle } from '../style'
import { FlexContainer } from '../../../lib/styled-components'
const OnePlans = (props) => {
  const { newUserSession, currentChosenPremiumPlan, choosePlan } = props

  useEffect(() => {
    if (newUserSession.premium_plan) {
      const premiumPlanTitle = newUserSession.premium_plan.title
      const activePlan = getActivePlanFromTitle(premiumPlanTitle)
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

  const handlePlanButtonClick = (title) => {
    const activePlan = getActivePlanFromTitle(title)
    choosePlan(activePlan)
    addPremiumPlanToNewUserSession(activePlan)
  }

  const SinglePackageButton = (plan) => {
    return (
      <PlanCircle
        active={currentChosenPremiumPlan.title === plan.title}
        onClick={() => handlePlanButtonClick(plan.title)}
      >
        <PlanTitle>{plan.title}</PlanTitle>
      </PlanCircle>
    )
  }

  const ActivePackageList = () => {
    const data = currentChosenPremiumPlan
    return (
      <>
        <div className='register-plan-single-active-data'>
          <span className='register-plan-single-text'>Monthly price</span>
          <span className='bold register-plan-single-text'>&euro;{Number(data.mprice).toFixed(0)}</span>
        </div>
        <Hr />
        <div className='register-plan-single-active-data'>
          <span className='register-plan-single-text'>Amount of dive center locations</span>
          <span className='bold register-plan-single-text'>{data.locations}</span>
        </div>
        <Hr />
        <div className='register-plan-single-active-data'>
          <span className='register-plan-single-text'>New customers / Month</span>
          <span className='bold register-plan-single-text'>{data.customers}</span>
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
            {premiumPackages.map((plan) => <SinglePackageButton key={plan.title} {...plan} />)}
          </FlexContainer>
          <div className='register-plan-active-data-container'>
            <ActivePackageList />
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

const getActivePlanFromTitle = (title) => {
  switch (title) {
    case 'Standard' : return standardPlan
    case 'Premium': return premiumPlan
    default: return basicPlan
  }
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
