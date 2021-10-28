// index.js 는 react 의 시작점 (backend 의 시작점)

// 밑 에 source 는 express.js 사이트에서 가져옴
const express = require('express')  // express 모듈을 가져옴
const app = express()   // 이 function 을 이용하여 새로운 app 을 만듦
const port = 5000   // 3000 이나 5000 이나 상관은 없음 (아무렇게 해도 상관없음)
const config = require('./config/key');
const cookieParser = require('cookie-parser');

// export 를 한 User Model 을 가져옴
const { User } = require('./models/User');
const { auth } = require('./middleware/auth');

const bodyParser = require('body-parser');
// body parser 가 client 에서 오는 정보를 분석하여 가져올 수 있게 해줌
app.use(bodyParser.urlencoded({extended: true}));
// application json 타입을 된것을 분석하여 가져올 수 있게 해줌
app.use(bodyParser.json());

// 이렇게 해주면 cookieParser 를 사용할 수 있음
app.use(cookieParser()) ;

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    // 몽구스 6.0 이상부터는 아래를 항상 기억하고 있기 때문에 따로 적어주지 않아도 된다
    // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("Mongo DB Connected ...."))
  .catch(err => console.log(err))


// mongodb 에서 copy를 해옴
// mongodb+srv://lee:<password>@behappy.gislx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

app.get('/', (req, res) => {    // root directory 의 hello world 를 출력
  res.send('Hello World! , 새해 복 많이 NodeMon Test ~~~~~ ')
  
})

app.get('/api/hello', (req, res) => {

    res.send("안녕하세요 index.js 입니다 (node)");
})

app.post('/api/users/register', (req, res) => {

    // 회원가입 할 때 필요한 정보들을 client 에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다

    const user = new User(req.body)

    // save 는 mongodb에서 오는 method
    user.save((err, userInfo) => {
        if(err) return res.json({success : false, err })
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/api/users/login', (req, res) => {

    // 요청 된 이메일을 데이터베이스에서 있는지 찾는다.
    // findOne 은 몽고 DB 가 제공하는 메서드
    User.findOne({email : req.body.email}, (err , user) => {
        // 찾는 user 가 없을 시에 
        if(!user) {
            return res.json({
                loginSuceess: false,
                message : '제공된 이메일에 해당하는 유저가 없습니다'
            })
        }

    // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
        if(!isMatch) 
            return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})

            // 비밀번호가 맞다면 토큰을 생성하여 주기
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
            
                // 토큰을 저장한다. 어디에 ... ??? (쿠키나 .. LocalStorage.. 세션 등등 ... 에도 저장이 가능)
                res.cookie("x_auth", user.token)
                .status(200)
                .json({loginSuccess:true, userId: user._id})
            })
        })
        // 비밀번호 까지 맞다면 Token 을 생성 하기 
    })
})
// Local 환경은 development 배포 한 후는 Production
// callback 함수 부르기 전에 중간에서 auth 가 처리를 해줌
app.get('/api/users/auth', auth, (req, res) => {

  // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentification이 True 라는 말
  res.status(200).json({
    _id: req.user._id,
    // Role Code는 개발자 마음대로 설정 가능 0이 아니면 관리자 0 이 일반 사용자
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })

}) 

app.get('/api/users/logout', auth, (req, res) => {

    // MongoDB 기본적인 Method
    User.findOneAndUpdate({_id:req.user._id},
        {token:""}, (err, user) => {
            if(err) return res.json({success:false, err});
            return res.status(200).send({
                success:true 
            })
        })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

