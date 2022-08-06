import { combineReducers } from 'redux';
import { admin_details_reducer } from './admin';
import { user_details_reducer } from './user';
import { addToCart_reducer } from './cart';

export const allReducers = combineReducers({
    user: user_details_reducer,
    cart: addToCart_reducer,
    admin: admin_details_reducer,
})