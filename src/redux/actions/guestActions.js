export const SET_GUEST = 'SET_GUEST';
export const SET_DIVES = 'SET_DIVES';
export const SET_RETAIL = 'SET_RETAIL';
export const SET_COURSES = 'SET_COURSES';
export const SET_RENTALS = 'SET_RENTALS';
export const SET_MODAL_VISIBILITY = 'SET_MODAL_VISIBILITY'



export const setGuest = (guestData) => {
    return {
        type: SET_GUEST,
        payload: {
            guest: guestData
        }
    }
}

export const setDives = (dives) => {
    return {
        type: SET_DIVES,
        payload: {
            dives: dives
        }
    }
}

export const setRetail = (retailItems) => {
    return {
        type: SET_RETAIL,
        payload: {
            retail: retailItems
        }
    }
}

export const setCourses = (courses) => {
    return {
        type: SET_COURSES,
        payload: {
            courses: courses
        }
    }
}

export const setRentals = (rentals) => {
    return {
        type: SET_RENTALS,
        payload: {
            rentals: rentals
        }
    }
}

export const setModalVisibility = (type, visibility) => {
    return {
        type: SET_MODAL_VISIBILITY,
        payload: {
            modal_type: type,
            modal_visibility: visibility
        }
    }
}