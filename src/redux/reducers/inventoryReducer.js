const defaultState = {
    inventoryItems: []
}

const inventoryReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'SET_INVENTORY_ITEMS': return {
            ...state,
            inventoryItems: action.payload.inventoryItems
        }
        default: return state
    }
}

export default inventoryReducer