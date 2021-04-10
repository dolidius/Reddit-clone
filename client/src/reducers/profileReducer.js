import { GET_PROFILE, NO_PROFILE, SET_PROFILE_LOADING } from "../actions/types";

const initialState = {
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_PROFILE:
            return {
                loading: false,
                ...action.payload
            }
        case NO_PROFILE:
            return false;
        case SET_PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}