import React from 'react';
import OneInfo from './steps/OneInfo';
import OnePlans from './steps/OnePlans';
import Header from '../../components/header';
import { connect } from 'react-redux';


const getFormStep = (props) => {
    const step = localStorage.getItem('newUserStep');

    switch(step){
        case '1-info': return <OneInfo {...props}/>
        case '1-plans': return <OnePlans {...props}/>
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