const fs = require('fs');

// 导入路由
const Router = require('koa-router')
// 实例化路由对象    
const router = new Router()


// 重定向
// router.redirect('/','/user')
// 自动读取当前目录下 除了index.js 所有js文件 并且统一加载并注册路由
fs.readdirSync(__dirname).forEach(file => {
  // console.log('wen',file);
  if (file !== 'index.js') {
    let r = require('./' + file)
    router.use(r.routes())
  }
})

// 导入user路由模块
// const user = require('./user.route')
// const test = require('./test.route')
// const goods = require('./goods.route')


// '/user' 前缀不写可以到模块内写 
// router.use('/test', test.routes(), test.allowedMethods())
// router.use('/user', user.routes(), user.allowedMethods())
// router.use('/goods', goods.routes(), test.allowedMethods())


// 导出路由对象
module.exports = router