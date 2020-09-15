import newAccountReducer from './newAccountReducer';
import userStateReducer from './userStateReducer';
import dashboardReducer from './dashboardReducer';
import headerReducer from './headerReducer';
import guestListReducer from './guestListReducer';
import loadingReducer from './loadingReducer';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
    newAccountReducer,
    userStateReducer,
    dashboardReducer,
    headerReducer,
    guestListReducer,
    loadingReducer
})

export default rootReducer;