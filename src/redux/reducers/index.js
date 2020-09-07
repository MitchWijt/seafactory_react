import newAccountReducer from './newAccountReducer';
import userStateReducer from './userStateReducer';
import dashboardReducer from './dashboardReducer';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
    newAccountReducer,
    userStateReducer,
    dashboardReducer
})

export default rootReducer;