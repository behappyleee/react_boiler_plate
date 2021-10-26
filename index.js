// index.js 는 react 의 시작점 (backend 의 시작점)

// 밑 에 source 는 express.js 사이트에서 가져옴
const express = require('express')  // express 모듈을 가져옴
const app = express()   // 이 function 을 이용하여 새로운 app 을 만듦
const port = 5000   // 3000 이나 5000 이나 상관은 없음 (아무렇게 해도 상관없음)
const config = require('./config/key');


// export 를 한 User Model 을 가져옴
const { User } = require('./modules/User');

const bodyParser = require('body-parser');
// body parser 가 client 에서 오는 정보를 분석하여 가져올 수 있게 해줌
app.use(bodyParser.urlencoded({extended: true}));
// application json 타입을 된것을 분석하여 가져올 수 있게 해줌
app.use(bodyParser.json());

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

app.post('/register', (req, res) => {

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

// Local 환경은 development 배포 한 후는 Production



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

