// 导入路由
const Router = require('koa-router')
// 实例化路由对象      { prefix: '/user' }) 开启路由前缀   
// const user = new Router({ prefix: '/user' })
const user = new Router()
const {auth} = require('../middleware/auth.middleware')
const {userValidator,verifyUser,crpytPassword,verifyLogin} = require('../middleware/user.middleware')
// 导入处理user的路由函数模块
const {register,login,changePassword} = require('../controller/user.controller')


// 编写路由规则
// 注册接口
user.post('/register',userValidator,verifyUser,crpytPassword,register)
// 登录接口
user.post('/login',userValidator,verifyLogin,login)
//修改密码接口
user.patch('/',auth,crpytPassword,changePassword)




module.exports = user