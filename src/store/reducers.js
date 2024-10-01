import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from '../Components/redux/loginRedux';
import signupReducer from '../Components/redux/signupRedux';
import movielistReducer from '../Components/redux/movieListRedux'
import watchLaterReducer from '../Components/redux/watchLaterRedux';
import movieViewReducer from '../Components/redux/movieViewPageRedux';
import forgotPasswordReducer from '../Components/redux/forgotPasswordRedux';
import resetPasswordReducer from '../Components/redux/resetPasswordRedux';
import watchHistoryReducer from '../Components/redux/watchHistoryRedux';
import ratingReducer from '../Components/redux/ratingRedux';
import subscriptionListingReducer from '../Components/redux/subscriptionListingRedux';
import planViewPageReducer from '../Components/redux/planViewPageRedux';
import getWatchLaterReducer from '../Components/redux/getWatchLaterRedux';
import getWatchHistoryReducer from '../Components/redux/getWatchHistoryRedux';

const rootReducer = combineReducers({
    signupReducer,
    loginReducer,
    forgotPasswordReducer,
    resetPasswordReducer,
    movielistReducer,
    watchLaterReducer,
    movieViewReducer,
    watchHistoryReducer,
    ratingReducer,
    subscriptionListingReducer,
    planViewPageReducer,
    getWatchLaterReducer,
    getWatchHistoryReducer

});

export default rootReducer;