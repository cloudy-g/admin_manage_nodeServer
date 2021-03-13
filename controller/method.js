// 查询当前用户数据列表中是否有当前用户信息
const findUser = (data, target) => {
  let ans = data.find(v => {
    if ((v.name == target.name || v.name == target.username) && v.password == target.password) {
      return true;
    }
  })
  if (!ans) {
    return {
      data: {
        status: 0,
        msg: '用户名或密码错误'
      }
    }
  }
  return ans;
}

// 通过比对新旧分类数据，生成要改变的 产品 pid 对应的 新类型 type
const updateProductCategory = (newCate, oldCate, type = [], sum) => {
  for (let i = 0; i < newCate.length; i++) {
    type.push(newCate[i].name);
    if (newCate[i].goodsList && newCate[i].goodsList.length > 0) {
      for (let j = 0; j < newCate[i].goodsList.length; j++) {
        newCate[i].goodsList[j].type = [...type];
      }
      sum.push(...newCate[i].goodsList);
    } else {
      if (newCate[i].childList) {
        updateProductCategory(newCate[i].childList, oldCate[i].childList, type, sum);
      }
    }
    type.pop();
  }
}

// 通过产品的更改，修改分类中的产品数据，将产品从所在列表中剔除，根据类型加入到合适分类中
function spliceById(id, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].goodsList && arr[i].goodsList.length > 0) {
      for (let j = 0; j < arr[i].goodsList.length; j++) {
        if (arr[i].goodsList[j].pid == id) {
          arr[i].goodsList.splice(j, 1);
          return;
        }
      }
    } else {
      if (arr[i].childList) {
        spliceById(id, arr[i].childList);
      }
    }
  }
}

function insertByType(type, arr, index, prod) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name == type[index]) {
      if (arr[i].childList) {
        insertByType(type, arr[i].childList, index + 1, prod);
      } else if (arr[i].goodsList) {
        arr[i].goodsList.push(prod);
        return;
      }
    }
  }
}

const insertProduct = (prod, categoryData) => {
  let {
    pid,
    type
  } = prod;
  spliceById(pid, categoryData);
  insertByType(type, categoryData, 0, prod);
}
let token = new Map();
const setToken = (tokenKey, newVal) => {
  // token = newVal;
  token.set(tokenKey, newVal);
}

module.exports = {
  findUser,
  updateProductCategory,
  insertProduct,
  setToken,
  token
}