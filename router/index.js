// 导入路由
const Router = require('koa-router')
// 导入user路由模块
const user = require('./user.route')
const test = require('./test.route')
// 实例化路由对象    
const router = new Router()




// 重定向
// router.redirect('/','/user')
// '/user' 前缀不写可以到模块内写 
router.use('/user',user.routes(),user.allowedMethods())
router.use('/test',test.routes(),test.allowedMethods())



// 导出路由对象
module.exports = router