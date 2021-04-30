const defaultState = {
  staffWorking: [],
  toDoToday: [],
  weather: {},
  guestsCheckingOut: []
}

const dashboardReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_STAFF_WORKING': {
      return {
        ...state,
        staffWorking: action.payload.staffWorking
      }
    }
    case 'ADD_TODO_TODAY': {
      return {
        ...state,
        toDoToday: action.payload.toDoToday
      }
    }
    case 'ADD_WEATHER': {
      return {
        ...state,
        weather: action.payload.weather
      }
    }
    case 'ADD_GUESTS': {
      return {
        ...state,
        guestsCheckingOut: action.payload.guestsCheckingOut
      }
    }
    default: return state
  }
}

export default dashboardReducer
