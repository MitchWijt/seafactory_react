import React from 'react'
import { Route } from 'react-router-dom'
import LoadingScreen from '../components/loadingScreen'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const userState = rest.userState

  return (
    <Route
      {...rest} render={(props) => {
        if (userState.isLoggedIn === null) {
          return <LoadingScreen />
        } else if (userState.isLoggedIn) {
          if (userState.licenseStatus === 'expired') {
            window.location.href = '/expired'
          }
          return <Component {...props} />
        } else {
          window.location.href = '/'
        }
      }}
    />
  )
}
