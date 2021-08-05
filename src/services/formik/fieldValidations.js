import { getIsEmailUnique } from '../../services/api'


export const validateReqFieldsNotEmpty = (reqFields, values) => {
  const errors = {}
  for (const field of reqFields) {
    if (values[field].length < 1) {
      errors[field] = `${field} is required`
    }
  }

  return errors
}

export const validateEmail = (email) => {
  const errors = {}
  if (!email) {
    errors.email = 'Email is required'
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
  ) {
    errors.email = 'Invalid email address'
  }
  return errors
}

export const validatePassword = (password) => {
  const errors = {}
  if (!password) {
    errors.password = 'Password is required'
  } else if (
    password.length < 8
  ) {
    errors.password = 'Password is too short'
  }
  return errors
}

export const emailIsUnique = async (email) => {
  const users = await getIsEmailUnique(email)
  return users.data.length < 1
}
