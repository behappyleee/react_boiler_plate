import { Axios } from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_action/user_action';
                                                    // ES6 문법으로 adminRoute = null 은 아무것도 파라미터 없을 시 기본값으로 null 이 들어감
export default function (SpecificComponent, option, adminRoute = null) { 
    
    // optin null --> 아무나 출입이 가능한 페이지 true--> 로그인 한 유저만 출입이 가능 false --> 로그인한 유저는 출입 불가능한 페이지

    function AuthenticaitonCheck(props) {

        const dispatch = useDispatch();

        useEffect(() => {
            
            dispatch(auth())
                .then(response => {
                console.log('auth.js userData : ', response)
            
            })

           //  Axios.get('/api/users/auth' )
        
        }, [])
        return (
            <SpecificComponent></SpecificComponent>
        )
    }
    return AuthenticaitonCheck;
}

