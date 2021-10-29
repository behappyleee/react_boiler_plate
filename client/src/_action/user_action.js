import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER
} from './types';

// 로그인
export function loginUser(dataToSubmit) {
    const request = axios.post('/api/users/login', dataToSubmit)
        .then( response => response.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}

// 회원가입
export function registerUser(dataToSubmit) {
    console.log('user_action', dataToSubmit)
    const request = axios.post('/api/users/register', dataToSubmit)
        .then( response => response.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}