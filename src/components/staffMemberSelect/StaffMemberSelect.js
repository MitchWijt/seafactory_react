import React, { useEffect } from 'react'
import SelectListItem from '../selectListItem'
import { connect } from 'react-redux'
import { setStaffMembers, setChosenStaffMembers } from '../../redux/actions/staffActions'
import { getStaffMembersOfLoggedInDiveCenter } from '../../services/dataFetchRequests/staffMembers'
import Select from '../../components/select'
import { getStaff } from '../../services/api'

const StaffMemberSelect = (props) => {
  const { setStaffMembers, setChosenStaffMembers } = props

  useEffect(() => {
    const getStaffMembers = async () => {
      const staffMembers = await getStaffMembersOfLoggedInDiveCenter()
      setStaffMembers(staffMembers)
    }
    getStaffMembers()
  }, [setStaffMembers])

  const handleChangeStaffSelect = (values, staffId, select) => {
    updateArrayChosenStaffMembers(values, staffId)

    // resets the select to the default option
    select.selectedIndex = 0
  }

  const updateArrayChosenStaffMembers = async (values, staffId) => {
    const chosenStaffMembers = []
    const staffMembersInitials = []

    const staffMember = getStaff(staffId)

    const staffDataObject = {
      id: staffMember.data._id,
      name: staffMember.data.name,
      initials: staffMember.data.initials
    }

    for (const staffMember of props.chosenStaffMembers) {
      chosenStaffMembers.push(staffMember)
      staffMembersInitials.push(staffMember.initials)
    }

    if (!chosenStaffMembers.includes(staffDataObject)) {
      chosenStaffMembers.push(staffDataObject)
      staffMembersInitials.push(staffDataObject.initials)
    }

    setChosenStaffMembers(chosenStaffMembers)
    values.staff = chosenStaffMembers
  }

  const onDeleteChosenStaff = (values, staffObject) => {
    const chosenStaffMembers = []
    const staffMembersInitials = []
    for (const staffMember of props.chosenStaffMembers) {
      if (staffMember.name !== staffObject.name) {
        chosenStaffMembers.push(staffMember)
        staffMembersInitials.push(staffMember.initials)
      }
    }

    setChosenStaffMembers(chosenStaffMembers)
    values.staff = chosenStaffMembers
  }

  const staffMembersSelectValues = props.staffMembers.map(item => {
    const selectObject = {}
    selectObject[item._id] = item.name
    return selectObject
  })

  return (
    <>
      <Select error={props.error} items={staffMembersSelectValues} placeholder={props.placeholder} name={props.name} onChange={(e) => handleChangeStaffSelect(props.formValues, e.target.value, e.target)} />
      <div className='d-flex fd-column'>
        {props.chosenStaffMembers.map((staff) => <SelectListItem onDelete={() => onDeleteChosenStaff(props.formValues, staff)} text={staff.name} />)}
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    staffMembers: state.staffReducer.staffMembers,
    chosenStaffMembers: state.staffReducer.chosenStaffMembers
  }
}

const mapDispatchToProps = { setStaffMembers, setChosenStaffMembers }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StaffMemberSelect)
