import qs from 'qs'
const { REACT_APP_API_URL, REACT_APP_STRIPE_PUBLISHABLE_KEY } = process.env

function getApiHost () {
  let apiHostFromLocalStorage = localStorage.apiHost
  const apiHostFromURL =
        window.location.search && qs.parse(window.location.search.slice(1)).apiHost

  if (!apiHostFromLocalStorage && !apiHostFromURL) {
    return REACT_APP_API_URL || 'http://localhost:1337'
  }

  if (apiHostFromURL) {
    localStorage.apiHost = apiHostFromURL
    apiHostFromLocalStorage = localStorage.apiHost
  }

  return apiHostFromLocalStorage
}

const config = {
  apiHost: getApiHost(),
  REACT_APP_API_URL,
  REACT_APP_STRIPE_PUBLISHABLE_KEY
}

export default config
