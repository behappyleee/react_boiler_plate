import {
    LOGIN_USER,
    REGISTER_USER,
    USER_AUTH
}  from '../_action/types';

export default function (state ={}, action) {
    switch(action.type) {
        case LOGIN_USER: 
            return { ...state, loginSuccess: action.payload }
            break;
        case REGISTER_USER :
            return { ...state, register: action.payload }
            break;
        case USER_AUTH : 
            return {...state, userData: action.payload }
            break;
        default: 
            return state; 
        
    }
}