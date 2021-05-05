import qs from 'qs'

function getApiHost (apiUrl = 'http://localhost:3001') {
  let apiHostFromLocalStorage = localStorage.apiHost
  const apiHostFromURL =
        window.location.search && qs.parse(window.location.search.slice(1)).apiHost

  if (!apiHostFromLocalStorage && !apiHostFromURL) return apiUrl

  if (apiHostFromURL) {
    localStorage.apiHost = apiHostFromURL
    apiHostFromLocalStorage = localStorage.apiHost
  }

  return apiHostFromLocalStorage
}

const config = {
  apiHost: getApiHost
}

export default config
