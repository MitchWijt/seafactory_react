const defaultState = {
    isLoggedIn: null, 
    role: null,
    user: null,
    settings: null,
    licenseStatus: null
}


const userStateReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'LOGIN': {
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                role: action.payload.role,
                user: action.payload.user,
                settings: action.payload.settings,
                licenseStatus: action.payload.licenseStatus
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isLoggedIn: false,
                role: null,
                user: null,
                settings: null,
                licenseStatus: null
            }
        }
        default: return state;
    }
}

export default userStateReducer;