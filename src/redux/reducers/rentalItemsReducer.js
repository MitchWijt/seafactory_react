const defaultState = {
  rentalItems: []
}

const rentalItemsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_RENTAL_ITEMS' : return {
      ...state,
      rentalItems: action.payload.rentalItems
    }
    default: return state
  }
}

export default rentalItemsReducer
