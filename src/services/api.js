import axios from 'axios'
import config from '../config'


export const api = axios.create({
  baseURL: config.apiHost,
  headers: {
    Authorization: `Bearer ${localStorage.apiToken}`
  }
})

const endpoints = {
  authorize: '/auth/user',
  login: '/login',
  register: '/user/register',
  exists: '/user',
  setToken: '/auth/set-token',
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
  createSubscription: '/payment/create-subscription',
  createEmployee: '/employee/add-new',
  createCompany: '/company/add-new',
  paymentPlans: '/payment-plans',
  weatherByLocation: '/weather?location=',
  staff: '/staff',
  guest: '/guest?id=',
  rentalsGuest: '/rentals?guestId='
  
}

export const registerStore = async (formData) => {
  const { data } = await api.post(endpoints.register, formData)
  return data
}

export const createSubscription = async (customerId, priceId) => {
  const { data } = await api.post(endpoints.createSubscription, { customerId, priceId })
  return data
}

export const createEmployee = async (opts = {}) => {
  const { email, password, firstName, lastName, companyId } = opts
  const { data } = await api.post(endpoints.createEmployee, { email, password, firstName, lastName, companyId })
  return data
}

export const getPaymentPlans = async () => {
  const { data } = await api.get(endpoints.paymentPlans)
  return data
}

export const login = async (credentials = {}) => {
  const { data } = await api.post(endpoints.login, credentials)
  localStorage.apiToken = data.token
  return data.token
}

export const createCompany = async (company) => {
  const { data } = await api.post(endpoints.createCompany, company)
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

export const getStaff = (staffId) => api.get(`${endpoints.getStaff}?id=${staffId}`)

export const getRentalById = async (rentalId) => await api.get(endpoints.getRentalById + `${rentalId}`)

export const getRentalItems = async () => await api.get(endpoints.rentalItems)

export const getInventoryItems = async () => await api.get(endpoints.inventory)

export const fetchCalendarItemsByDate = async (date) => api.get(endpoints.calendarItemsByDate + date)

export const getWeatherByLocation = location => api.get(endpoints.weatherByLocation + location)

export const getStaffByField = (field, value) => api.get(endpoints.getStaff + `?${field}=${value}`)

export const getAmountDue = async (registrationId, airTanks = 0, nxTanks = 0, discount = 0) => {
  const getTotalCost = await api.get(`/registration/total-cost?id=${registrationId}&air=${airTanks}&nitrox=${nxTanks}&discount=${discount}`)
  return getTotalCost.data.total
}

export const getStaffMembersOfLoggedInDiveCenter = async () => {
  const staffMembers = await api.get(endpoints.staff)
  return staffMembers.data
}

export const getGuestData = async (guestId) => await api.get(endpoints.guest + guestId)

export const getGuestRentalsData = async (guestId) => await api.get(endpoints.rentalsGuest + guestId)

export const getGuestDepDate = (date) => api.get(`/guest?dep_date=${date}`)

export const getTodayDate = (date) => api.get(`/calendar?date=${date}`)

export const getProductCategory = (data) => api.get(`/product/product-categories?title=${data}`)



