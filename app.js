let express = require('express');
let cors = require('cors');
var bodyParser = require('body-parser')
let {
    router
} = require('./controller/router');
const fs = require('fs');
let app = express();
// post表单
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
// 跨域
app.use(cors());
// 静态资源
app.use(express.static('static'));
// app.use(express.static('public'));
// 处理图片路径问题
// app.use('/api1', (req, res, ) => {
//     let target = req.originalUrl.replace('/api1', '');
//     res.redirect(target);
// })

app
    .use(router)
    // .use((req, res) => {
    //     fs.readFile(__dirname + '/public/index.html', (err, data) => {
    //         if (err) {
    //             res.send('后台错误')
    //         } else {
    //             res.writeHead(200, {
    //                 'Content-Type': 'text/html; charset=utf-8',
    //             });
    //             res.end(data)
    //         }
    //     })
    // })
    .use((req, res) => {
        res.send('404');
    })
    .listen(5000, () => {
        console.log('http://127.0.0.1:5000');
    })