const defaultState = {
    isLoggedIn: null, 
    user: null
}


const userStateReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'LOGIN': {
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                user: action.payload.user
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isLoggedIn: false,
                user: null
            }
        }
        default: return state;
    }
}

export default userStateReducer;