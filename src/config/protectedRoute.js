import React from 'react'
import { Route } from 'react-router-dom'
import { useJwt } from 'react-jwt'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isExpired } = useJwt(localStorage.apiToken)

  return (
    <Route
      {...rest} render={(props) => {
        if (isExpired) window.location.href = '/'

        return <Component {...props} />
      }}
    />
  )
}
