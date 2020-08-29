import React, {useEffect} from 'react';
import '../style.css';
import {premiumPackages, basicPlan, standardPlan, premiumPlan} from '../../../services/premiumPackages';
import {choosePlan} from '../../../redux/actions/newAccountActions';
import {connect} from 'react-redux';
import Hr from '../../../components/hr';
import Button from '../../../components/button';
const OnePlans = (props) => {
    const {newUserSession, currentChosenPremiumPlan, choosePlan} = props;

    useEffect(() => {
        if(newUserSession.premium_plan){
            let premiumPlanTitle = newUserSession.premium_plan.title;
            let activePlan = getActivePlanFromTitle(premiumPlanTitle);
            choosePlan(activePlan);
        } else {
            addPremiumPlanToNewUserSession(basicPlan);
        }
    }, []);

    const handleClick = () => {
        localStorage.setItem('newUserStep', '2-info');
        props.history.push('/register');
    }

    const handlePlanButtonClick = (title) => {
        let activePlan = getActivePlanFromTitle(title);
        choosePlan(activePlan);
        addPremiumPlanToNewUserSession(activePlan);
    }

    const SinglePackageButton = (plan) => {
        const classname = currentChosenPremiumPlan.title === plan.title ? 'register-plan-button active' : 'register-plan-button';
        return (
            <div onClick={() => handlePlanButtonClick(plan.title)} className={classname}>
                <div className="register-plan-button-text">
                    <span>{plan.title}</span>
                </div>
            </div>
        )
    }

    const ActivePackageList = () => {
        const data = currentChosenPremiumPlan;
        return (
            <>
                <div className='register-plan-single-active-data'>
                    <span className='register-plan-single-text'>Monthly price</span>
                    <span className='bold register-plan-single-text'>&euro;{Number(data.mprice).toFixed(0)}</span>
                </div>
                <Hr/>
                <div className='register-plan-single-active-data'>
                    <span className='register-plan-single-text'>Amount of dive center locations</span>
                    <span className='bold register-plan-single-text'>{data.locations}</span>
                </div>
                <Hr/>
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
                <div className='register-plans-container'>
                    <div className="register-text">
                        <p className='register-step-counter'>Step 1 of 4</p>
                        <h1 className='heavy-title'>Choose the best plan for your dive center</h1>
                    </div>
                    <div className="register-plans-buttons">
                        {
                            premiumPackages.map((plan) => <SinglePackageButton key={plan.title} {...plan}/>)
                        }
                    </div>
                    <div className="register-plan-active-data-container">
                        <ActivePackageList/>
                        {props.currentChosenPremiumPlan.title !== 'Premium' ? <p id='customerLimitExceeds'>*If customer limit gets exceeded its $2 extra per customer</p> : ''}
                    </div>  
                    <div className='register-cta-button'>
                        <Button onClick={handleClick} type='cta' fontType='bold' text='Continue'/>
                    </div>     
                </div>
            </div>
        </>
    )
}

const getActivePlanFromTitle = (title) => {
    switch(title) {
        case 'Standard' : return standardPlan;
        case 'Premium': return premiumPlan;
        default: return basicPlan;
    }
}

const addPremiumPlanToNewUserSession = (premiumPlan) => {
    let currentSession = JSON.parse(localStorage.getItem('newUser'));
    let sessionData = {...currentSession, premium_plan: premiumPlan};
    localStorage.setItem('newUser', JSON.stringify(sessionData));
}

const mapStateToProps = (state) => {
    return {
        currentChosenPremiumPlan: state.newAccountReducer.currentChosenPremiumPlan,
        newUserSession: JSON.parse(localStorage.getItem('newUser'))
    }
}

const mapDispatchToProps = {choosePlan};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OnePlans)