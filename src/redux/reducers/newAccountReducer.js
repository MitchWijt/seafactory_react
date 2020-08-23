const defaultState = {
    email:          '',
    password:       '', 
    dive_center:    '',
    dive_center_address: '',
    dive_center_country: '',
    premium_plan:   {},
    locations:      [],
    date_of_birth:  '',
    receiveMail:    null
}


const newAccountReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'ADD_EMAIL': {
            return {
                ...state,
                ...action.payload
            }
        }
        default: return state;
    }
}

export default newAccountReducer;