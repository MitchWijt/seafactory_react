import { getToken } from './api'

export const handleLogout = async () => {
  // sets bearer token which removes the JWT token from the cookie.
  await getToken()
  window.location.reload()
}
