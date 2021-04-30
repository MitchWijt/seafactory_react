const SET_GUESTS = 'SET_GUESTS'

export const setGuests = (guests) => {
  return {
    type: SET_GUESTS,
    payload: {
      guests: guests
    }
  }
}
