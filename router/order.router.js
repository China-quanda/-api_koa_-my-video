const Router = require('koa-router')

const router = new Router({prefix:'/orders'})

const {auth} = require('../middleware/auth.middleware')
const {create,findAll,update} =require('../controller/order.controller')

//提交订单
// 验证address_id int  goods_info string total string
router.post('/',auth,create)

// 获取订单列表
router.get('/',auth,findAll)

// 更新订单状态
// 校验status 必填 number类型
router.patch('/:id',auth,update)


module.exports = router