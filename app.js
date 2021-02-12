let express = require('express');
let cors = require('cors');
var bodyParser = require('body-parser')
let {
    router
} = require('./controller/router');

let app = express();
// post表单
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
// 跨域
app.use(cors());

app
    .use(router)
    .listen(5000, () => {
        console.log('http://127.0.0.1:5000');
    })