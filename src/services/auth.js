import axios from 'axios'
import { getToken, setToken } from './api'

export const handleLogin = async (data, loginType) => {
  try {
    const { email, password } = data
    const url = getReqUrlBasedOnLoginType(loginType)

    const res = await axios.get(url, {
      headers: {
        email: email,
        password: password,
        'Content-Type': 'application/json'
      }
    })
    const jwt = loginType === 'admin' ? res.data.jwt : res.data.jwtStaff
    await setToken(jwt)
  } catch (e) {
    console.log(e.response.data.description)
  }
}

const getReqUrlBasedOnLoginType = (loginType) => {
  if (loginType === 'admin') {
    return '/login/admin'
  } else {
    return '/login/staff'
  }
}
export const handleLogout = async () => {
  // sets bearer token which removes the JWT token from the cookie.
  await getToken()
  window.location.reload()
}
