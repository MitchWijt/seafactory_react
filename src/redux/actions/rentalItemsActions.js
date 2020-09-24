export const SET_RENTAL_ITEMS = "SET_RENTAL_ITEMS";

export const setRentalItems = (rentalItems) => {
    return {
        type: SET_RENTAL_ITEMS,
        payload: {
            rentalItems: rentalItems
        }
    }
}