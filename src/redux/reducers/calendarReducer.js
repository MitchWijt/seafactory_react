import moment from 'moment-timezone'

const defaultState = {
  calendarItems: [],
  isLoadingCalendarItems: false,
  selectedDate: moment().format(),
  calendarItemRefs: [],
  calendarItemPopover: '',
  calendarItemCategories: [],
  singleCalendarItem: null,
  editCalendarItemScreen: null,
  addCalendarItemModalVisibility: false
}

const calendarReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CALENDAR_ITEMS' : return {
      ...state,
      calendarItems: action.payload.calendarItems
    }
    case 'SET_SINGLE_CALENDAR_ITEM' : return {
      ...state,
      singleCalendarItem: action.payload.singleCalendarItem
    }
    case 'SET_CALENDAR_ITEM_POPOVER' : return {
      ...state,
      calendarItemPopover: action.payload.calendarItemPopover
    }
    case 'SET_CALENDAR_ITEM_REFS' : return {
      ...state,
      calendarItemRefs: action.payload.calendarItemRefs
    }
    case 'SET_SELECTED_DATE' : return {
      ...state,
      selectedDate: action.payload.selectedDate
    }
    case 'SET_ADD_CALENDAR_ITEM_VISIBILITY' : return {
      ...state,
      addCalendarItemModalVisibility: action.payload.visibility
    }
    case 'SET_LOADING_CALENDAR_ITEMS' : return {
      ...state,
      isLoadingCalendarItems: action.payload.isLoading
    }
    case 'SET_EDIT_CALENDAR_ITEM_SCREEN' : return {
      ...state,
      editCalendarItemScreen: action.payload.component
    }
    case 'SET_CALENDAR_ITEM_CATEGORIES' : return {
      ...state,
      calendarItemCategories: action.payload.calendarItemCategories
    }

    default: return state
  }
}

export default calendarReducer
