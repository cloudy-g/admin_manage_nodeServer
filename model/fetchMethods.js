const fs = require('fs');
const {
    findUser
} = require('../controller/method')

let getUserData = (req, callback) => {
    fs.readFile('data/account.json', (err, data) => {
        if (err) {
            callback(err);
            return;
        }
        data = JSON.parse(data.toString())
        let ans = findUser(data.userData, req);
        callback(null, JSON.stringify(ans));
    })
}

let getCategoryData = (req, callback) => {
    fs.readFile('data/category.json', (err, data) => {
        if (err) {
            callback(err);
            return;
        }
        data = JSON.parse(data.toString())
        callback(null, JSON.stringify(data.data));
    })
}

module.exports = {
    getUserData,
    getCategoryData
}