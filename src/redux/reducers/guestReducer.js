const defaultState = {
    guest: {}, 
    dives: [],
    retail: [],
    courses: [],
    rentals: [],
    divesModalVisibility: false,
    rentalModalVisibility: false,
    retailModalVisibility: false,
    coursesModalVisibility: false
}


const guestReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'SET_GUEST': {
            return {
                ...state,
                guest: action.payload.guest
            }
        }
        case 'SET_DIVES': {
            return {
                ...state,
                dives: action.payload.dives
            }
        }
        case 'SET_RETAIL': {
            return {
                ...state,
                retail: action.payload.retail
            }
        }
        case 'SET_COURSES': {
            return {
                ...state,
                courses: action.payload.courses
            }
        }
        case 'SET_RENTALS': {
            return {
                ...state,
                rentals: action.payload.rentals
            }
        }
        case 'SET_MODAL_VISIBILITY': {
            let newState = {...state};
            
            switch(action.payload.modal_type){
                case 'addDive': newState = {
                    ...state,
                    divesModalVisibility: action.payload.modal_visibility
                }
                break;
                case 'addRental': newState = {
                    ...state,
                    rentalModalVisibility: action.payload.modal_visibility
                }
                break;
                case 'addRetail': newState = {
                    ...state,
                    retailModalVisibility: action.payload.modal_visibility
                }
                break;
                case 'addCourse': newState = {
                    ...state,
                    coursesModalVisibility: action.payload.modal_visibility
                }
                break;
                default: return newState;
                
            }
            return newState;
        }
        default: return state;
    }
}

export default guestReducer;