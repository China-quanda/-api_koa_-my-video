const Router = require('koa-router')
const router = new Router({ prefix: '/address'})

const {auth} = require('../middleware/auth.middleware')
const {create,findAll,update,remove,setDefault} = require('../controller/address.controller')

// 添加地址接口 
// 验证收件人string类型，手机int，地址不能为空string 手机格式校验
router.post('/',auth,create)

//获取地址列表
router.get('/',auth,findAll)

// 更新 修改地址   
// 验证收件人string类型，手机int，地址不能为空string 手机格式校验
router.put('/:id',auth,update)


//删除地址
router.delete('/:id',auth,remove)


// 设置默认地址
router.patch('/:id',auth,setDefault)
module.exports = router