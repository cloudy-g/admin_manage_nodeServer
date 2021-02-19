const router = require('express').Router();
const {
    getUserData,
    getUsersData,
    getCategoryData,
    updateCategoryData,
    getProductData,
    updateProduct,
    fetchCharactors,
    updateCharactor,
    delCharactor,
    updateUsersData,
    delAccount,
    getTargetCharctor
} = require('../model/fetchMethods');
let fs = require('fs')
let multer = require('multer')
let upload = multer({
    dest: 'static/upload'
})

router // 对用户进行验证登录信息
    .post('/login', (req, res, next) => {
        getUserData(req.body, (err, data) => {
            if (err) {
                next(err);
            }
            res.send(data);
        })
    }) // 获取分类信息
    .get('/category', (req, res, next) => {
        getCategoryData(req, (err, data) => {
            if (err) {
                next(err);
            }
            res.send(data);
        })
    }) // 对分类信息进行更新
    .post('/category', (req, res, next) => {
        updateCategoryData(req, (err, data) => {
            if (err) {
                next(err);
            }
            res.send(data);
        })
    }) // 获取商品数据
    .get('/product', (req, res, next) => {
        getProductData(req, (err, data) => {
            if (err) {
                next(err);
            }
            res.send(data);
        })
    }) // 修改数据
    .post('/product/update', (req, res, next) => {
        updateProduct(req.body, (err, data) => {
            if (err) {
                next(err);
            }
            res.send(data);
        })
    }) // 上传图片
    .post('/img/upload', upload.single('file'), (req, res, next) => {
        let {
            destination,
            path,
            originalname
        } = req.file;
        let newIp = `${destination}/${originalname}`;
        fs.rename(path, newIp, (err) => {
            if (err) {
                next(err);
            }
            res.send(`${newIp}`);
        })
    }) // 获取角色数据
    .get('/charactors', (req, res, next) => {
        fetchCharactors(req, (err, data) => {
            if (err) {
                next(err);
            }
            res.send(data);
        })
    }) // 删除角色
    .get('/charactor/delete', (req, res, next) => {
        delCharactor(req.query.name, (err, data) => {
            if (err) {
                next(err);
            }
            res.send(data);
        })
    }) // 更新角色（添加或者删除）
    .post('/charactor', (req, res, next) => {
        updateCharactor(req.body, (err, data) => {
            if (err) {
                next(err);
            }
            res.send(data);
        })
    }) // 获取指定角色
    .get('/charactor', (req, res, next) => {
        getTargetCharctor(req.query.type, (err, data) => {
            if (err) {
                next(err);
            }
            res.send(data);
        })
    }) // 获取所有用户信息
    .get('/accounts', (req, res, next) => {
        getUsersData((err, data) => {
            if (err) {
                next(err);
            }
            res.send(data);
        })
    })
    .post('/account', (req, res, next) => {
        updateUsersData(req.body, (err, data) => {
            if (err) {
                next(err);
            }
            res.send(data);
        })
    }) // 删除用户
    .get('/account/delete', (req, res, next) => {
        delAccount(req.query.key, (err, data) => {
            if (err) {
                next(err);
            }
            res.send(data);
        })
    })
    .use((req, res) => {
        res.send('404');
    })

module.exports = {
    router
};