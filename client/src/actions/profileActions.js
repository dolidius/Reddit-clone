import { GET_PROFILE, NO_PROFILE, SET_PROFILE_LOADING } from './types';

import axios from 'axios';

export const getProfile = login => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`http://localhost:5000/api/profile/${login}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
        })
        .catch(err => dispatch({
            type: NO_PROFILE
        }));
}

export const editProfile = (login, profileData, history) => dispatch => {
    axios.post(`http://localhost:5000/api/profile/${login}/edit`, profileData)
        .then(res => {
            history.push(`/u/${login}`);
        })
        .catch(err => console.log(err));
}

export const setProfileLoading = () => {
    return {
        type: SET_PROFILE_LOADING
    }
}