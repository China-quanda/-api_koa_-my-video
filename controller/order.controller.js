const { createOrder,findAllOrder ,updateOrder} = require('../service/order.service')
class OrderController {
  async create(ctx) {
    const user_id = ctx.state.user.id
    const { address_id, goods_info, total } = ctx.request.body
    const order_number = Date.now()
    try {
      const res = await createOrder({ user_id, address_id, goods_info, total, order_number })
      ctx.body = {
        code: 0,
        message: '生成订单成功ok',
        result: res
      }
    } catch (error) {
      console.error(error);
    }
  }
  async findAll(ctx) {
    const { pageNum = 1, pageSize = 10, status = 0 } = ctx.request.query
    try {
      const res = await findAllOrder(pageNum, pageSize, status)
      ctx.body = {
        code:0,
        message:'获取订单列表成功ok',
        result: res
      }
    } catch (error) {
      console.error(error);
    }
  }
  async update(ctx){
    const id = ctx.request.params.id;
    const {status} = ctx.request.body
    console.log(id,);
    try {
      const res = await updateOrder(id,status)
      ctx.body={
        code:0,
        message:'修改订单状态成功ok',
        result: res
      }
    } catch (error) {
      console.error(error);
    }

  }
}
module.exports = new OrderController();