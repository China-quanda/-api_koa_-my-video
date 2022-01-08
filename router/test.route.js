// 导入路由
const Router = require('koa-router')
// 导入处理user的路由函数模块
const {testfn} = require('../controller/test.controller')
// const user = new Router({ prefix: '/user' })
// 实例化路由对象      { prefix: '/user' }) 开启路由前缀   
const test = new Router({ prefix: '/test'})





// 测试接口
test.post('/',testfn)



module.exports = test