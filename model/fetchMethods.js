const fs = require('fs');
const {
    findUser,
    updateProductCategory,
    insertProduct,
    setToken
} = require('../controller/method')
// 获取所有用户数据
const getUsersData = callback => {
    fs.readFile('data/account.json', (err, data) => {
        if (err) {
            callback(err, null);
            return;
        }
        data = JSON.parse(data.toString());
        callback(null, data.userData);
    })
}
// 更新用户数据
const updateUsersData = (req, callback) => {
    fs.readFile('data/account.json', (err, data) => {
        if (err) {
            callback(err);
            return;
        }
        data = JSON.parse(data.toString())
        data = data.userData;
        let index = data.findIndex(v => v.create_time == req.create_time);
        let tem;
        if (index == -1) {
            tem = Object.assign({}, req);
            data.push(tem);
        } else {
            tem = req;
            data[index] = tem;
        }
        fs.writeFile('data/account.json', JSON.stringify({
            userData: data
        }), () => {
            callback(null, 'success');
        })
    })
}
// 删除指定用户
const delAccount = (key, callback) => {
    fs.readFile('data/account.json', (err, data) => {
        if (err) {
            callback(err);
            return;
        }
        data = JSON.parse(data.toString())
        data = data.userData;
        let index = data.findIndex(v => v.create_time == key);
        data.splice(index, 1);
        fs.writeFile('data/account.json', JSON.stringify({
            userData: data
        }), () => {
            callback(null, '删除成功');
        })
    })
}

// 登录验证
const getUserData = (req, callback) => {
    getUsersData((err, data) => {
        if (err) {
            callback(err);
            return;
        }
        let ans = findUser(data, req);
        setToken(ans.name, ans);
        ans.token = ans.name;
        callback(null, JSON.stringify(ans));
    })
}

// 分类数据获取
const getCategoryData = (req, callback) => {
    fs.readFile('data/category.json', (err, data) => {
        if (err) {
            callback(err);
            return;
        }
        data = JSON.parse(data.toString())
        callback(null, JSON.stringify(data.data));
    })
}
// 分类更新
const updateCategoryData = (req, callback) => {
    fs.readFile('data/category.json', (err, categoryData) => {
        if (err) {
            callback(err);
            return;
        }
        categoryData = JSON.parse(categoryData.toString());
        let saveData = req.body,
            sum = [];
        updateProductCategory(saveData, categoryData.data, [], sum);
        fs.writeFile('data/category.json', JSON.stringify({
            data: saveData
        }), () => {
            fs.writeFile('data/product.json', JSON.stringify({
                data: sum
            }), () => {
                callback(null, 'success')
            })
        })

    })
}
// 获取产品数据
const getProductData = (req, callback) => {
    fs.readFile('data/product.json', (err, data) => {
        if (err) {
            callback(err);
            return;
        }
        data = JSON.parse(data.toString())
        callback(null, JSON.stringify(data.data));
    })
}
// 添加产品
const updateProduct = (req, callback) => {
    fs.readFile('data/product.json', (err, data) => {
        if (err) {
            callback(err);
            return;
        }
        data = JSON.parse(data.toString());
        data = data.data;
        let index = data.findIndex(v => v.pid == req.pid);
        let tem;
        if (index == -1) {
            tem = Object.assign({
                code: 0,
                status: 0,
                shopId: Math.floor(Math.random() * 10000)
            }, req)
            data.push(tem);
        } else {
            tem = req;
            data[index] = tem;
        }
        fs.writeFile('data/product.json', JSON.stringify({
            data: data
        }), () => {
            fs.readFile('data/category.json', (err, categoryData) => {
                if (err) {
                    callback(err);
                    return;
                }
                categoryData = JSON.parse(categoryData.toString());
                insertProduct(tem, categoryData.data);
                fs.writeFile('data/category.json', JSON.stringify(categoryData), () => {
                    callback(null, 'success')
                })
            })
        })
    })
}
// 获取角色数据
const fetchCharactors = (req, callback) => {
    fs.readFile('data/charactor.json', (err, data) => {
        if (err) {
            callback(err);
            return;
        }
        data = JSON.parse(data.toString())
        callback(null, JSON.stringify(data.data));
    })
}
// 更新角色数据
const updateCharactor = (req, callback) => {
    fs.readFile('data/charactor.json', (err, data) => {
        if (err) {
            callback(err);
            return;
        }
        data = JSON.parse(data.toString())
        data = data.data;
        let index = data.findIndex(v => v.create_time == req.create_time);
        let tem;
        if (index == -1) {
            tem = Object.assign({
                menus: [],
                accounts: [],
                auth_time: '',
                auth_er: '',
            }, req)
            data.push(tem);
        } else {
            tem = req;
            data[index] = tem;
        }
        fs.writeFile('data/charactor.json', JSON.stringify({
            data: data
        }), () => {
            callback(null, 'success');
        })
    })
}
// 删除指定角色
const delCharactor = (name, callback) => {
    fs.readFile('data/charactor.json', (err, data) => {
        if (err) {
            callback(err);
            return;
        }
        data = JSON.parse(data.toString())
        data = data.data;
        let index = data.findIndex(v => v.name == name);
        data.splice(index, 1);
        fs.writeFile('data/charactor.json', JSON.stringify({
            data: data
        }), () => {
            callback(null, '删除成功');
        })
    })
}
// 获取指定角色
const getTargetCharctor = (type, callback) => {
    fs.readFile('data/charactor.json', (err, data) => {
        if (err) {
            callback(err);
            return;
        }
        data = JSON.parse(data.toString())
        data = data.data;
        let tem = data.find(v => type === v.name);
        callback(null, JSON.stringify(tem));
    })
}

module.exports = {
    getUserData,
    getCategoryData,
    updateCategoryData,
    getProductData,
    updateProduct,
    fetchCharactors,
    updateCharactor,
    delCharactor,
    getUsersData,
    updateUsersData,
    delAccount,
    getTargetCharctor
}