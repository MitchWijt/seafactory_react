const defaultState = {
    menuShown: false, 
    searchFormShown: false,
}


const headerReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'SET_MENU_STATE': {
            return {
                ...state,
                menuShown: action.payload.menuState
            }
        }
        case 'SET_FORM_STATE': {
            return {
                ...state,
                searchFormShown: action.payload.searchFormState
            }
        }
        default: return state;
    }
}

export default headerReducer;