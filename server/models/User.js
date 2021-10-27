const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
// salt 를 이용해서 비밀번호를 암호화 하여야 함
// salt 를 먼저 생성을 하여야 함
// salt rounds 라는게 있음 saltRound --> salt 가 몇글자인지 나타내
// salt 를 10 자리를 만들어 암호화 시켜 줌
const saltRounds = 10
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,  // trim 은 space 를 없애주는역할을함 공백을
        unique: 1
    },
    password: {
        type: String,
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,   // role 은 default 값을 지정하여줌 Number 타입에 값을 넣지 않았을 떄는 0이 디폴트로 들어가게 해줌
        default: 0
    },
    imgae: String,
    token:{
        type: String,

    },
    tokenExp:{
        type: Number
    }
})

// user 를 저장하기 전에 무언가를 해 줌 (save 를 실행하기 시켜주기전에 먼저 실행)
userSchema.pre('save', function(next) {

    var user = this;    // 입력한 비밀번호를 가르킴
    // 비밀번호를 바꾸었을 때만 밑에 로직을 타게 함 (이 조건이 없을 시 매번 저장시 이밑에 로직을 타게 함)
    if(user.isModified('password')) {   // isModified mongo 기본 함수
    // 비밀번호를 암호화 pre 함수는 save 전에 실행을 시켜줌
    bcrypt.genSalt(saltRounds, function(err, salt) {
       
        if(err) return next(err)

        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err)

            // user.password 를 hash 로 바꾸어줌 (암호화된 패스워드로 )
            user.password = hash
            console.log(hash)
            next()
        })

    });
    // 비밀번호를 바꾸는 것이 아닌 다른 정보를 수정 시 에 밑에 로직 실행
    } else {
        // next 가 없을 시 그냥 머무름
        next();
    }

});

userSchema.methods.comparePassword = function(plainPassword, cb) {

    // plainPassword 1234 암호화된 비밀번호 와 비교를 해줌
    // plain password 와 암호화된 비밀번호가 맞는 지 확인하려면 plain 을 암호화하여 db 에있는 password 와 같은지 비교
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        // isMatch 는 맞으면 true 를 반환 아닐시에는 false 를 반환
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function(cb) {

    var user = this;
    
    // jsonwebtoken 을 이용하여 token 을 생성하기
    // user._id 와 문자열인 'secretToken' 을 합쳐 토큰을 만듦
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    // user._id + 'secretToken' = token
    user.token = token  // 생성된 token 을 넣어 줌
    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;
   
    // Token 을 decode 한다
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // 유저 아이디를 이용하여 유저를 찾은 다음
        // 클라이언트에서 가져온 토큰과 DB에 보관된 토큰이 일치하는 지 확인

        user.findOne({"_id" : decoded, "token": token} , function(err, user) {
            if(err) return cb(err);
            cb(null, user) 
        })
    })
}

const User  = mongoose.model('User', userSchema)
module.exports = { User }





