import { Axios } from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_action/user_action';
                                                    // ES6 문법으로 adminRoute = null 은 아무것도 파라미터 없을 시 기본값으로 null 이 들어감
export default function (SpecificComponent, option, adminRoute = null) { 
    
    // optin null --> 아무나 출입이 가능한 페이지 true--> 로그인 한 유저만 출입이 가능 false --> 로그인한 유저는 출입 불가능한 페이지

    function AuthenticaitonCheck(props) {

        const dispatch = useDispatch();

        // useEffect 는 기본 react class 형에서만 사용이 가능하였지만 그 기능을 함수형 에서도 사용가능하게 해주는 함수
        useEffect(() => {
            dispatch(auth())
                .then(response => {
                 console.log('auth.js userData : ', response)
                // 로그인 하지 않은 상태
                if(!response.payload.isAuth) {
                    // 로그인 하지 않은 상태
                    if(option) {
                        props.history.push('/login');
                    }
                    // } else {
                    //     // 로그인 한 상태 (admin 이 아니지만 admin페이지로 접근 시 )
                    //     if(adminRoute && !response.data.isAdmin) {
                    //         props.history.push('/');
                    //     } else {
                    //         // 로그인한 유저가 출입 불가능한 페이지로 이동 시 에
                    //         if(option === false ) {
                    //             props.history.push('/');
                    //         }   
                    //     }
                    // }
                } else {
                    // 로그인 한 상태 (admin 이 아니지만 admin페이지로 접근 시 )
                    if(adminRoute && !response.payload.isAdmin) {
                        props.history.push('/');
                    } else {
                        // 로그인한 유저가 출입 불가능한 페이지로 이동 시 에
                        if(option === false ) {
                            props.history.push('/');
                        }   
                    }
                }
            })
           //  Axios.get('/api/users/auth' )
        }, [])
        return (
            <SpecificComponent></SpecificComponent>
        )
    }
    return AuthenticaitonCheck;
}

