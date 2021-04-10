import { LOAD_SUBREDDIT, SET_SUBREDDIT_LOADING } from "../actions/types";
import isEmpty from '../utilities/isEmpty';

const initialState = {
    loading: false,
    exists: false
}

export default function(state = initialState, action){
    switch(action.type){
        case SET_SUBREDDIT_LOADING:
            return {
                ...state,
                loading: true
            }
        case LOAD_SUBREDDIT:
            return {
                ...state,
                info: action.payload,
                exists: !isEmpty(action.payload),
                loading: false
                
            }

        default:
            return state;
    }
}