import { GET_ERRORS, LOAD_SUBREDDIT, SET_SUBREDDIT_LOADING } from './types';
import axios from 'axios';
import { getLatestSubredditPosts } from './postActions';

export const createSubreddit = (subredditData, history) => dispatch => {
    axios.post('http://localhost:5000/api/subreddits/new', subredditData)
        .then(res => history.push(`/r/${subredditData.name}`))
        .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
        }));
}

export const loadSubreddit = (subredditName, n = 1) => dispatch => {
    dispatch(setSubredditLoading());
    axios.get(`http://localhost:5000/api/subreddits/${subredditName}`)
        .then(res => {
            dispatch({
                type: LOAD_SUBREDDIT,
                payload: res.data
            });
            dispatch(getLatestSubredditPosts(subredditName, n));
        })
        .catch(err => dispatch({
            type: LOAD_SUBREDDIT,
            payload: {}
        }));
}

export const setSubredditLoading = () => {
    return {
        type: SET_SUBREDDIT_LOADING
    }
}