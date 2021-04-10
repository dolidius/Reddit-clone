import axios from 'axios';
import { GET_POST, SET_POST_LOADING, GET_POSTS, GET_AMOUNT } from './types';

export const createPost = (subredditName, history, postData) => dispatch => {
    axios.post(`http://localhost:5000/api/posts/${subredditName}/new`, postData)
        .then(res => history.push(`/r/${subredditName}/${res.data._id}`))
        .catch(err => console.log(err.response.data));
}

export const getPost = postId => dispatch => {
    dispatch(setPostLoading());
    axios.get(`http://localhost:5000/api/posts/${postId}`)
        .then(res => dispatch({
            type: GET_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_POST,
            payload: null
        }));
}

export const setPostLoading = () => {
    return {
        type: SET_POST_LOADING
    }
}

export const addComment = (commentData, postId) => dispatch => {
    axios.post(`http://localhost:5000/api/posts/${postId}/comment`, commentData)
        .then(res => dispatch({
            type: GET_POST,
            payload: res.data
        }))
        .catch(err => console.log(err));
}

export const getLatestPosts = (n = 1) => dispatch => {
    dispatch(setPostLoading());
    dispatch(getAmountOfPosts());
    axios.get(`http://localhost:5000/api/posts/latest/${n}`)
        .then(res => dispatch({
            type: GET_POSTS,
            payload: res.data
        }))
        .catch(err => console.log(err));
}

export const getLatestSubredditPosts = (subredditName, n = 1) => dispatch => {
    dispatch(setPostLoading());
    dispatch(getAmountOfPosts('subreddit', subredditName));
    axios.get(`http://localhost:5000/api/posts/subreddit/${subredditName}/latest/${n}`)
        .then(res => dispatch({
            type: GET_POSTS,
            payload: res.data
        }))
        .catch(err => console.log(err));
}

export const getLatestUserPosts = (login, n = 1) => dispatch => {
    dispatch(setPostLoading());
    dispatch(getAmountOfPosts('user', login));
    axios.get(`http://localhost:5000/api/posts/user/${login}/latest/${n}`)
        .then(res => dispatch({
            type: GET_POSTS,
            payload: res.data
        }))
        .catch(err => console.log(err));
}

export const getAmountOfPosts = (place, placeName) => dispatch => {
    if(place){
        axios.get(`http://localhost:5000/api/posts/count/${place}/${placeName}`)
            .then(res => dispatch({
                type: GET_AMOUNT,
                payload: res.data.postsNumber
            }));
    }else{
        axios.get(`http://localhost:5000/api/posts/count`)
            .then(res => dispatch({
                type: GET_AMOUNT,
                payload: res.data.postsNumber
            }));
    }
}

export const upvotePost = id => dispatch => {
    axios.post(`http://localhost:5000/api/posts/${id}/upvote`);
}

export const downvotePost = id => dispatch => {
    axios.post(`http://localhost:5000/api/posts/${id}/downvote`);
}