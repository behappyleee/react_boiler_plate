const { User } = require("../models/User");


let auth = (req, res, next) => {

    // 인증처리들을 처리

    // 클라이언트 쿠키에서 Token 을 가져옴
    let token = req.cookies.x_auth;

    // 토큰을 복호화 한 후 유저를 찾는다
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({isAuth:false, error:true})

        req.token = token;
        req.user = user;
        next(); // next 가 없으면 갇혀버림
    })


    // 유저가 있을 시 인증 Okay
    // 유저가 없으면 인증 No

}

module.exports = { auth };