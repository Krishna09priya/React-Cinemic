import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from '../Components/redux/loginRedux';
import signupReducer from '../Components/redux/signupRedux';
import movielistReducer from '../Components/redux/movieListRedux'
import watchLaterReducer from '../Components/redux/watchLaterRedux';
import movieViewReducer from '../Components/redux/movieViewPageRedux';


const rootReducer = combineReducers({
    signupReducer,
    loginReducer,
    movielistReducer,
    watchLaterReducer,
    movieViewReducer

});

export default rootReducer;