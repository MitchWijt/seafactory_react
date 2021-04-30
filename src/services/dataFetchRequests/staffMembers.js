import axios from 'axios'

export const getStaffMembersOfLoggedInDiveCenter = async () => {
  const staffMembers = await axios.get('/staff')
  return staffMembers.data
}
