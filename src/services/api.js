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
  getUserInsuranceItems: '/product/product-categories?title=Insurance',
  calendarItemsByDate: '/calendar?date=',
  calendarItemsById: '/calendar?id=',
  calendarItemsByCategories: '/calendar/categories',
  removeCalendarItemById: '/calendar?id=',
  insuranceItems: '/product/product-categories?title=Insurance',
  getRentalById: '/rentals?id=',
  rentalItems: '/rental-item',
  inventory: '/inventory',
  weatherByLocation: '/weather?location='
}

export const registerStore = async (formData) => {
  const { data } = await api.post(endpoints.register, formData)
  return data
}

export const authorizeUser = async () => {
  const { data } = await api.get(endpoints.authorize)
  return data
}

export const getUserInsuranceItems = async () => {
  const { data } = await api.get(endpoints.insuranceItems)
  return data.items
}

export const fetchCalendarItemById = async (id) => {
  const { data } = await api.get(endpoints.calendarItemsById + id)
  return data
}

export const checkUserExists = async (email) => {
  const { data } = await api.get(`${endpoints.exists}?email=${email}`)
  return Boolean(data.length)
}

export const setToken = (token) => api.post(endpoints.setToken, { jwt: token })

export const fetchCalendarItemCategories = async () => api.get(endpoints.calendarItemsByCategories)

export const removeCalendarItemById = async (id) => api.delete(endpoints.removeCalendarItemById + id)

export const getToken = () => api.get(endpoints.getToken)

export const getStaff = (staffId) => api.get(`${endpoints.getStaff}?id=${staffId}`)

export const getRentalById = async (rentalId) => await api.get(endpoints.getRentalById + `${rentalId}`)

export const getRentalItems = async () => await api.get(endpoints.rentalItems)

export const getInventoryItems = async () => await api.get(endpoints.inventory)

export const fetchCalendarItemsByDate = async (date) => api.get(endpoints.calendarItemsByDate + date)

export const getWeatherByLocation = location => axios.get(endpoints.weatherByLocation + location)

export const getStaffByField = (field, value) => api.get(endpoints.getStaff + `?${field}=${value}`)
