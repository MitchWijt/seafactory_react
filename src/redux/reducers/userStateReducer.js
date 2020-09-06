const defaultState = {
    isLoggedIn: null, 
    role: null,
    user: null
}


const userStateReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'LOGIN': {
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                role: action.payload.role,
                user: action.payload.user
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isLoggedIn: false,
                role: null,
                user: null
            }
        }
        default: return state;
    }
}

export default userStateReducer;