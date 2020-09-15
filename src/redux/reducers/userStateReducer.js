const defaultState = {
    isLoggedIn: null, 
    role: null,
    user: null,
    settings: null
}


const userStateReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'LOGIN': {
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                role: action.payload.role,
                user: action.payload.user,
                settings: action.payload.settings
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isLoggedIn: false,
                role: null,
                user: null,
                settings: null
            }
        }
        default: return state;
    }
}

export default userStateReducer;