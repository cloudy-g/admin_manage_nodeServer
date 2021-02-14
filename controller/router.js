const router = require('express').Router();
const {
    getUserData,
    getCategoryData
} = require('../model/fetchMethods');

router
    .post('/login', (req, res, next) => {
        getUserData(req.body, (err, data) => {
            if (err) {
                next(err);
            }
            console.log(data);
            res.send(data);
        })
    })
    .get('/category', (req, res, next) => {
        getCategoryData(req, (err, data) => {
            if (err) {
                next(err);
            }
            console.log(data);
            res.send(data);
        })
    })
    .post('/category', (req, res, next) => {
        getCategoryData(req, (err, data) => {
            if (err) {
                next(err);
            }
            console.log(data);
            res.send(data);
        })
    })
    .use((req, res) => {
        res.send('404');
    })

module.exports = {
    router
};