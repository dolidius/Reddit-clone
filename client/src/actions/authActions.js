import { GET_ERRORS, SET_CURRENT_USER, CHANGE_USER_AVATAR } from './types';
import setAuthToken from '../utilities/setAuthToken';
import jwt_decode from 'jwt-decode';

import axios from 'axios';


export const registerUser = (user, history) => dispatch => {
    axios.post('http://localhost:5000/api/users/register', user)
        .then(res => history.push('/login'))
        .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
        }));
}

export const loginUser = (user, history) => dispatch => {
    axios.post('http://localhost:5000/api/users/login', user)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwt', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
            history.push('/')
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

export const setCurrentUser = decoded => {
    return{
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwt');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}