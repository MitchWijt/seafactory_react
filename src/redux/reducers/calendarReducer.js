import moment from 'moment-timezone';

const defaultState = {
    calendarItems: [],
    isLoadingCalendarItems: false,
    selectedDate: moment().format(),
    calendarItemRefs: [],
    calendarItemPopover: '',
    addCalendarItemModalVisibility: false,
}

const calendarReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'SET_CALENDAR_ITEMS' : return {
            ...state,
            calendarItems: action.payload.calendarItems
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

        default: return state;
    }
}

export default calendarReducer;