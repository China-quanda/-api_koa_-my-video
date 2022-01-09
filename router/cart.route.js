//1，导入koa-router
const Router = require('koa-router')

// 中间件
const {auth}=require('../middleware/auth.middleware')
const {validatorGoodsID,validatorGoodsNumber,validatorGoodsSelected,validatorNumberSelected,validatorArr} = require('../middleware/cart.middleware')

// 控制器
const {add,findAll,update,remove,selectAll,unselectAll,total} = require('../controller/cart.controller')

//2，实例化router对象
const router = new Router({ prefix: '/carts'})

// 3，编写路由规则
// 3.1添加到购物车接口  登录 格式 
//TODO: 还有小细节：添加到购物车之前，我们还要判断添加的商品是否下架的,判断有没有商品的这个ID  留下一个彩蛋
router.post('/',auth,validatorGoodsID,add)

// 3.2获取购物车列表
router.get('/',auth,findAll)

// 3.3更新购物车
router.patch('/:id',auth,validatorGoodsNumber,validatorGoodsSelected,validatorNumberSelected, update )

//3.4删除购物车
router.delete('/',auth,validatorArr,remove)

// 3.5全选   3.5和3.6可以合并为一个函数来优化
router.post('/selectAll',auth,selectAll)
// 3.6全不选
router.post('/unselectAll',auth,unselectAll)
// 3.7 获取购物车商品总数量接口
router.get('/total',auth,total)
// 4，导出路由对象
module.exports = router