export const SET_DIVE_ITEMS = 'SET_DIVE_ITEMS';
export const SET_RETAIL_ITEMS = 'SET_RETAIL_ITEMS';
export const SET_COURSE_ITEMS = 'SET_COURSE_ITEMS';

export const setDiveItems = (diveItems) => {
    return {
        type: SET_DIVE_ITEMS,
        payload: {
            diveItems: diveItems
        }
    }
}

export const setRetailItems = (retailItems) => {
    return {
        type: SET_RETAIL_ITEMS,
        payload: {
            retailItems: retailItems
        }
    }
}

export const setCourseItems = (courseItems) => {
    return {
        type: SET_COURSE_ITEMS,
        payload: {
            courseItems: courseItems
        }
    }
}