import {combineReducers} from 'redux'
import {AuthReducer} from './AuthReducer'
import {GameReducer} from './GameReducer'
export const rootReducer = combineReducers({
    AuthReducer,
    GameReducer
});