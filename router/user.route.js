// 导入路由
const Router = require('koa-router')
// 实例化路由对象      { prefix: '/user' }) 开启路由前缀   
// const user = new Router({ prefix: '/user' })
const user = new Router()

const {userValidator,verifyUser,crpytPassword,verifyLogin} = require('../middleware/user.middleware')
// 导入处理user的路由函数模块
const {register,login} = require('../controller/user.controller')


// 编写路由规则
user.post('/register',userValidator,verifyUser,crpytPassword,register)
user.post('/login',userValidator,verifyLogin,login)




module.exports = user