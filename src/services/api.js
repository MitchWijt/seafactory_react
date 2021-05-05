import axios from 'axios'
import config from '../config'

const api = axios.create({ baseURL: config.apiHost() })

const endpoints = {
  authorize: '/auth/user',
  register: '/user/register',
  exists: '/user'
}

export const registerStore = async () => {
  const { data } = await api.post(endpoints.register)
  return data
}

export const authorizeUser = async () => {
  const { data } = await api.get(endpoints.authorize)
  return data
}

export const checkUserExists = async (email) => {
  const { data } = await api.get(`${endpoints.exists}?email=${email}`)
  return Boolean(data.length)
}
