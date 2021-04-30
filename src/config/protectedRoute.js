import React from 'react'
import { Route } from 'react-router-dom'
import LoadingScreen from '../components/loadingScreen'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const userState = rest.userState

  return (
    <Route
      {...rest} render={(props) => {
        if (!userState.isLoggedIn) return <LoadingScreen />

        if (userState.isLoggedIn && userState.licenseStatus === 'expired') {
          window.location.href = '/expired'
        } else {
          window.location.href = '/'
        }

        return <Component {...props} />
      }}
    />
  )
}
