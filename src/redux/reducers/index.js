import newAccountReducer from './newAccountReducer';
import userStateReducer from './userStateReducer';
import dashboardReducer from './dashboardReducer';
import headerReducer from './headerReducer';
import guestListReducer from './guestListReducer';
import guestReducer from './guestReducer';
import loadingReducer from './loadingReducer';
import productItemsReducer from './productItemsReducer';
import staffReducer from './staffReducer';
import rentalItemsReducer from './rentalItemsReducer';
import inventoryReducer from './inventoryReducer';
import rentalReducer from './rentalReducer';
import calendarReducer from './calendarReducer';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
    newAccountReducer,
    userStateReducer,
    dashboardReducer,
    headerReducer,
    guestListReducer,
    guestReducer,
    loadingReducer,
    productItemsReducer,
    staffReducer,
    rentalItemsReducer,
    inventoryReducer,
    calendarReducer,
    rentalReducer
})

export default rootReducer;