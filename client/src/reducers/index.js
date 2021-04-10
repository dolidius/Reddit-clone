import { combineReducers } from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import subredditReducer from './subredditReducer';
import postReducer from './postReducer';
import profileReducer from './profileReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    subreddit: subredditReducer,
    post: postReducer,
    profile: profileReducer
});