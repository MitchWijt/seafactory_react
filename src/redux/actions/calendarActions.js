export const SET_SELECTED_DATE = 'SET_SELECTED_DATE'
export const SET_CALENDAR_ITEMS = 'SET_CALENDAR_ITEMS'
export const SET_LOADING_CALENDAR_ITEMS = 'SET_LOADING_CALENDAR_ITEMS'
export const SET_CALENDAR_ITEM_REFS = 'SET_CALENDAR_ITEM_REFS'
export const SET_CALENDAR_ITEM_POPOVER = 'SET_CALENDAR_ITEM_POPOVER'
export const SET_ADD_CALENDAR_ITEM_VISIBILITY = 'SET_ADD_CALENDAR_ITEM_VISIBILITY'
export const SET_CALENDAR_ITEM_CATEGORIES = 'SET_CALENDAR_ITEM_CATEGORIES'
export const SET_SINGLE_CALENDAR_ITEM = 'SET_SINGLE_CALENDAR_ITEM'
export const SET_EDIT_CALENDAR_ITEM_SCREEN = 'SET_EDIT_CALENDAR_ITEM_SCREEN'

export const setSelectedDate = (selectedDate) => {
  return {
    type: SET_SELECTED_DATE,
    payload: {
      selectedDate: selectedDate
    }
  }
}

export const setSingleCalendarItem = (singleCalendarItem) => {
  return {
    type: SET_SINGLE_CALENDAR_ITEM,
    payload: {
      singleCalendarItem: singleCalendarItem
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

export const setCalendarItemCategories = (categories) => {
  return {
    type: SET_CALENDAR_ITEM_CATEGORIES,
    payload: {
      calendarItemCategories: categories
    }
  }
}

export const setEditCalendarItemScreen = (component) => {
  return {
    type: SET_EDIT_CALENDAR_ITEM_SCREEN,
    payload: {
      component: component
    }
  }
}
