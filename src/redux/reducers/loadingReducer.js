const defaultState = {
    isLoading: true,
}


const loadingReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'SET_IS_LOADING': {
            return {
                ...state,
                isLoading: action.payload.isLoading
            }
        }
        default: return state;
    }
}

export default loadingReducer;