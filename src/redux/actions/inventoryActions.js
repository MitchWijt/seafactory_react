export const SET_INVENTORY_ITEMS = 'SET_INVENTORY_ITEMS';

export const setInventoryItems = (inventoryItems) => {
    return {
        type: SET_INVENTORY_ITEMS,
        payload: {
            inventoryItems: inventoryItems
        }
    }
}