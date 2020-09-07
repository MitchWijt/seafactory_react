import React from 'react';
import { Route } from 'react-router-dom';
import LoadingCircle from '../components/loadingCircle';

export const ProtectedRoute = ({component: Component, ...rest}) => {
    let userState = rest.userState;

    return (
        <Route {...rest} render={(props) => {
            if(userState.isLoggedIn === null) {
                return <LoadingCircle color={'#000000'}/>
            } else if(userState.isLoggedIn) {
                return <Component {...props}/>
            } else {
                window.location.href = '/';
            }
        }}/>
    )
}