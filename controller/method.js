// 查询当前用户数据列表中是否有当前用户信息
const findUser = (data, target) => {
  let ans = data.find(v => {
    if (v.username == target.username && v.password == target.password) {
      return true;
    }
  })
  if (!ans) {
    return {
      status: 0,
      msg: '用户名或密码错误'
    }
  }
  return ans;
}

module.exports = {
  findUser
}