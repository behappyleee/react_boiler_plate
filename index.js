// index.js 는 react 의 시작점 (backend 의 시작점)

// 밑 에 source 는 express.js 사이트에서 가져옴
const express = require('express')  // express 모듈을 가져옴
const app = express()   // 이 function 을 이용하여 새로운 app 을 만듦
const port = 5000   // 3000 이나 5000 이나 상관은 없음 (아무렇게 해도 상관없음)

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://lee:1234@behappy.gislx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    // 몽구스 6.0 이상부터는 아래를 항상 기억하고 있기 때문에 따로 적어주지 않아도 된다
    // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("Mongo DB Connected ...."))
  .catch(err => console.log(err))


// mongodb 에서 copy를 해옴
// mongodb+srv://lee:<password>@behappy.gislx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

app.get('/', (req, res) => {    // root directory 의 hello world 를 출력
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

