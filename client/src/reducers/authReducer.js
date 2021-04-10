import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../utilities/isEmpty';

const initialState = {
    authenticated: false,
    user: {}
}

export default function(state = initialState, action){
    switch(action.type){
        case SET_CURRENT_USER:
            return{
                ...state,
                authenticated: !isEmpty(action.payload),
                user: action.payload
            }
        default:
            return state;
    }
}