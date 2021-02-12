const router = require('express').Router();
const {
    getUserData,
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
    .use((req, res) => {
        res.send('404');
    })

module.exports = {
    router
};