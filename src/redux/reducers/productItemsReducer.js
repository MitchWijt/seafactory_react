const defaultState = {
    diveItems: [],
    courseItems: [],
    retailItems: [],
    insuranceItems: []
}


const productItemsReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'SET_DIVE_ITEMS': {
            return {
                ...state,
                diveItems: action.payload.diveItems
            }
        }
        case 'SET_RETAIL_ITEMS': {
            return {
                ...state,
                retailItems: action.payload.retailItems
            }
        }
        case 'SET_COURSE_ITEMS': {
            return {
                ...state,
                courseItems: action.payload.courseItems
            }
        }
        case 'SET_INSURANCE_ITEMS': {
            return {
                ...state,
                insuranceItems: action.payload.insuranceItems
            }
        }
        default: return state;
    }
}

export default productItemsReducer;