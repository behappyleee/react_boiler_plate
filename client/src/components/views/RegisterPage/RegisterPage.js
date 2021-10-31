import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_action/user_action';
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {
    const dispatch = useDispatch();
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler= (event) => {
        setEmail(event.currentTarget.value);
    }
    const onPasswordHandler= (event) => {
        setPassword(event.currentTarget.value);
    }
    const onNameHandler= (event) => {
        setName(event.currentTarget.value);
    }
    const onConfirmPasswordHandler= (event) => {
        setConfirmPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {

        // 이것을 안해주면 페이지가 그냥 refresh 가 됨 그냥 refresh 가 되버리면 원래 해야 할 일들이 그냥 refresh 가 되어 할 수 가 없음
        // 이 밑에 것을 넣어주면 방지 됨
        event.preventDefault();

        if(Password !== ConfirmPassword ) {
            return alert('비밀번호화 비밀번호 확인이 다릅니다.');
        }

        let body = {
            email: Email,
            password: Password,
            name: Name
        }

         dispatch(registerUser(body))
            .then(response => {
                console.log(response.payload.success)
                if(response.payload.success) {
                    // 성공시 페이지를 루트페이지로 이동 시켜 줌
                    props.history.push('/login')
                } else {    
                    alert('Failed to Sign Up');
                }
            })
        
        // state 안에 서버에다가 클라이언트에 서버에 보내 로그인을 하여야 함 서버에 보내야 할 값들이 state에 가지고 있음
        // 서버에 보내야 할떄는 Axios 를 사용 하여 Axios.post 메서드를 이용
    }
    return (
        <div style={{
            display:'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height:'100vh'
        }}>
           <form style={{display: 'flex', flexDirection:'column'}}
            onSubmit={onSubmitHandler}
           
           >
               <label>Email </label>
               <input type="email" value={Email} onChange={onEmailHandler}/>

               <label>Name</label>
               <input type="text" value={Name} onChange={onNameHandler}/>
               
               <label>Password</label>
               <input type="password" value={Password} onChange={onPasswordHandler}/>
              
               <label>Confirm Password</label>
               <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>

               <button type="submit">
                   회원 가입
               </button>
           </form>
        </div>
    )
}

export default withRouter(RegisterPage)