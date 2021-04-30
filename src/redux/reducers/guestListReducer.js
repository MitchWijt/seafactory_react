const defaultState = {
  guests: []
}

const guestListReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_GUESTS': {
      return {
        ...state,
        guests: action.payload.guests
      }
    }
    default: return state
  }
}

export default guestListReducer
