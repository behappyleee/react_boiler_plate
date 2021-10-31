import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    USER_AUTH
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

// 회원가입
export function auth(dataToSubmit) {
    console.log('user_action')
    // get 은 body 부분이 필요없음
    const request = axios.get('/api/users/auth')
        .then( response => response.data)

    return {
        type: USER_AUTH,
        payload: request
    }
}