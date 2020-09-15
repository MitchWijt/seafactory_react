export const ADD_WEATHER = 'ADD_WEATHER';
export const ADD_STAFF_WORKING = 'ADD_STAFF_WORKING';
export const ADD_TODO_TODAY = 'ADD_TODO_TODAY';
export const ADD_GUESTS = 'ADD_GUESTS';

export const addWeather = (weatherData) => {
    return {
        type: ADD_WEATHER,
        payload: {
            weather: weatherData
        }
    }
}

export const addStaffWorking = (staffWorking) => {
    return {
        type: ADD_STAFF_WORKING,
        payload: {
            staffWorking: staffWorking
        }
    }
}

export const addTodoToday = (toDoTodayData) => {
    return {
        type: ADD_TODO_TODAY,
        payload: {
            toDoToday: toDoTodayData
        }
    }
}

export const addGuests = (guestsCheckingOut) => {
    return {
        type: ADD_GUESTS,
        payload: {
            guestsCheckingOut: guestsCheckingOut
        }
    }
}