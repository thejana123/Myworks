import Login from './isLogged';
import Add from './addNew';
import Completed from './completed';
import User from './user';
import {combineReducers} from 'redux';

const allReducer=combineReducers({
    Login,
    Add,
    Completed,
    User

})

export default allReducer;