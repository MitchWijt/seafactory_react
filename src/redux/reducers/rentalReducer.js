const defaultState = {
    singleRental: {},
    addRentalModalIsActive: false,
    editRentalModalIsActive: false,
}

const rentalReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'SET_SINGLE_RENTAL': return {
            ...state,
            singleRental: action.payload.singleRental
        }
        case 'SET_ADD_RENTAL_MODAL': return {
            ...state,
            addRentalModalIsActive: action.payload.modalState
        }
        case 'SET_EDIT_RENTAL_MODAL': return {
            ...state,
            editRentalModalIsActive: action.payload.modalState
        }
        default: return state
    }
}

export default rentalReducer