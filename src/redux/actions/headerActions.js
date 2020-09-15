const SET_MENU_STATE = 'SET_MENU_STATE';
const SET_FORM_STATE = 'SET_FORM_STATE';

export const setMenuState = (menuState) => {
    return {
        type: SET_MENU_STATE,
        payload: {
            menuState: menuState
        }
    }
}

export const setSearchFormState = (searchFormState) => {
    return {
        type: SET_FORM_STATE,
        payload: {
            searchFormState: searchFormState
        }
    }
}