import axios from 'axios'
import config from '../config'

const api = axios.create({ baseURL: config.apiHost() })

const endpoints = {
  authorize: '/auth/user',
  register: '/user/register',
  exists: '/user',
  setToken: '/auth/set-token',
  getToken: '/token',
  getStaff: '/staff',
  getUserInsuranceItems: '/product/product-categories?title=Insurance'
}

export const registerStore = async (formData) => {
  const { data } = await api.post(endpoints.register, formData)
  return data
}

export const authorizeUser = async () => {
  const { data } = await api.get(endpoints.authorize)
  return data
}

export const setToken = (token) => {
  return api.post(endpoints.setToken, { jwt: token })
}

export const getToken = () => api.get(endpoints.getToken)

export const getStaff = (staffId) => api.get(`${endpoints.getStaff}?id=${staffId}`)

export const checkUserExists = async (email) => {
  const { data } = await api.get(`${endpoints.exists}?email=${email}`)
  return Boolean(data.length)
}
