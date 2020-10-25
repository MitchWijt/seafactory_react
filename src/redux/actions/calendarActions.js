export const SET_SELECTED_DATE = 'SET_SELECTED_DATE';
export const SET_CALENDAR_ITEMS = 'SET_CALENDAR_ITEMS';
export const SET_LOADING_CALENDAR_ITEMS = 'SET_LOADING_CALENDAR_ITEMS';
export const SET_CALENDAR_ITEM_REFS = 'SET_CALENDAR_ITEM_REFS';
export const SET_CALENDAR_ITEM_POPOVER = 'SET_CALENDAR_ITEM_POPOVER';
export const SET_ADD_CALENDAR_ITEM_VISIBILITY = 'SET_ADD_CALENDAR_ITEM_VISIBILITY';

export const setSelectedDate = (selectedDate) => {
    return {
        type: SET_SELECTED_DATE,
        payload: {
            selectedDate: selectedDate
        }
    }
}

export const setCalendarItemPopover = (popover) => {
    return {
        type: SET_CALENDAR_ITEM_POPOVER,
        payload: {
            calendarItemPopover: popover
        }
    }
}

export const setAddCalendarItemModalVisibility = (visibility) => {
    return {
        type: SET_ADD_CALENDAR_ITEM_VISIBILITY,
        payload: {
            visibility: visibility
        }
    }
}

export const setCalendarItems = (calendarItems) => {
    return {
        type: SET_CALENDAR_ITEMS,
        payload: {
            calendarItems: calendarItems
        }
    }
}

export const setCalendarItemRefs = (calendarItemRefs) => {
    return {
        type: SET_CALENDAR_ITEM_REFS,
        payload: {
            calendarItemRefs: calendarItemRefs
        }
    }
}

export const setLoadingCalendarItems = (isLoading) => {
    return {
        type: SET_LOADING_CALENDAR_ITEMS,
        payload: {
            isLoading: isLoading
        }
    }
}

