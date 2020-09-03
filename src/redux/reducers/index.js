import newAccountReducer from './newAccountReducer';
import userStateReducer from './userStateReducer';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
    newAccountReducer,
    userStateReducer
})

export default rootReducer;