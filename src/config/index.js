import qs from 'qs'

function getApiHost (defaultApi) {
  let apiHostFromLocalStorage = localStorage.apiHost
  const apiHostFromURL =
        window.location.search && qs.parse(window.location.search.slice(1)).apiHost

  if (!apiHostFromLocalStorage && !apiHostFromURL) {
    // Production api url here
    return defaultApi || 'http://localhost:3001'
  }

  if (apiHostFromURL) {
    localStorage.apiHost = apiHostFromURL
    apiHostFromLocalStorage = localStorage.apiHost
  }

  return apiHostFromLocalStorage
}

const config = {
  apiHost: getApiHost()
}

export default config
