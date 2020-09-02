import React from 'react';
import OneInfo from './steps/OneInfo';
import OnePlans from './steps/OnePlans';
import TwoInfo from './steps/TwoInfo';
import TwoPassword from './steps/TwoPassword';
import Header from '../../components/header';
import { connect } from 'react-redux';
import ThreeDiveCenter from './steps/ThreeDiveCenter';
import FourPayment from './steps/FourPayment';


const getFormStep = (props) => {
    const step = localStorage.getItem('newUserStep');

    switch(step){
        case '1-info': return <OneInfo {...props}/>
        case '1-plans': return <OnePlans {...props}/>
        case '2-info': return <TwoInfo {...props}/>
        case '2-password': return <TwoPassword {...props} />
        case '3-dive-center': return <ThreeDiveCenter {...props}/>
        case '4-payment': return <FourPayment {...props} />
        default: return <OneInfo/>
    }
}

const Register = (props) => {
    return (
        <>
            <Header/>
            {getFormStep(props)}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        newAccount: {...state.newAccountReducer}
    }
}

export default connect(
    mapStateToProps,
)(Register)