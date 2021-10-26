const mongoose = require('mongoose')

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
        milength: 50
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

const User  = mongoose.model('User', userSchema)

module.exports = { User }





