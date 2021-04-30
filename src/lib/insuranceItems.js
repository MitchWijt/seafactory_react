import axios from 'axios'

export const getUserInsuranceItems = async () => {
  const insuranceCategory = await axios.get('/product/product-categories?title=Insurance')
  return insuranceCategory.data.items
}
