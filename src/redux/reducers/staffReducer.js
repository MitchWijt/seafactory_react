const defaultState = {
  staffMembers: [],
  chosenStaffMembers: []
}

const staffReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_STAFF_MEMBERS': {
      return {
        ...state,
        staffMembers: action.payload.staffMembers
      }
    }
    case 'SET_CHOSEN_STAFF_MEMBERS': {
      return {
        ...state,
        chosenStaffMembers: action.payload.chosenStaffMembers
      }
    }
    default: return state
  }
}

export default staffReducer
