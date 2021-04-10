import { GET_POST, SET_POST_LOADING, GET_POSTS, GET_AMOUNT } from "../actions/types";

const initialState = {
    loading: false,
    posts: [],
    post: null,
    amount: null
};

export default function(state = initialState, action){
    switch(action.type){
        case GET_POST:
            return {
                ...state,
                post: action.payload,
                loading: false,
            };
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false,
            }
        case GET_AMOUNT:
            return {
                ...state,
                amount: action.payload
            }
        case SET_POST_LOADING:
            return {
                ...state,
                loading: true,
            }
        default:
            return state;
    }
}