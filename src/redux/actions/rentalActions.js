export const SET_SINGLE_RENTAL = 'SET_SINGLE_RENTAL'

export const setSingleRental = (singleRental) => {
  return {
    type: SET_SINGLE_RENTAL,
    payload: {
      singleRental: singleRental
    }
  }
}
