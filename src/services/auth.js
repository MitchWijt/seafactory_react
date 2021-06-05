
export const handleLogout = async () => {
  // sets bearer token which removes the JWT token from the cookie.
  localStorage.clear()
  window.location.reload()
}
