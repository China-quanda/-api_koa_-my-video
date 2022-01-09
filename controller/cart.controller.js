const {createOrUpdate,findCarts,updateCarts,removeCarts,selectAllCarts,unselectAllCarts,totalCarts} = require('../service/cart.service')
class CartController{
  //添加到购物车
  async add(ctx) {
    //将商品添加到购物车
    // 1解析user_id , goods_id 
    const user_id = ctx.state.user.id;
    const {goods_id} = ctx.request.body
    // console.log(user_id,goods_id);
    // 2操作数据库
    try {
      const res = await createOrUpdate(user_id, goods_id)
    // 3返回结果
    ctx.body ={
      code:0,
      message:'添加到购物车成功ok',
      result: res
    }
    } catch (error) {
      console.error(error);
    }
  }
  //获取购物车列表
  async findAll(ctx){
    //1解析请求参数
    const {pageNum=1,pageSize=10}=ctx.request.query
    // 2操作数据库
    try {
      const res = await findCarts(pageNum,pageSize)
      // 3返回结果
      ctx.body = {
        code:0,
        message:'获取购物车列表成功ok',
        result:res
      }
    } catch (error) {
      console.error(error);
    }
  }
  //更新购物车
  async update(ctx){
    const {id} = ctx.request.params
    const {number,selected} = ctx.request.body
    try {
      const res = await updateCarts({id,number,selected})
   ctx.body={
     code:0,
     message:'更新购物车成功ok',
     result:res
   }
    } catch (error) {
      console.error(error);
    }
  }
  //删除购物车
  async remove(ctx){
    const {ids} = ctx.request.body
    let idss = Array.from(ids)
    try {
      const res = await removeCarts(idss)
      ctx.body={
        code:0,
        message:'删除购物车成功ok',
        result:res
      }
    } catch (error) {
      console.error(error);
    }
  }
  //全选
  async selectAll(ctx){
    const user_id = ctx.state.user.id
    try {
      const res = await selectAllCarts(user_id)
      ctx.body = {
        code:0,
        message:'全部选中',
        result: res
      }
    } catch (error) {
      console.error(error);
    }
  }
  //全不选
  async unselectAll(ctx){
    const user_id = ctx.state.user.id
    try {
      const res = await unselectAllCarts(user_id)
      ctx.body = {
        code:0,
        message:'取消全部选中',
        result: res
      }
    } catch (error) {
      console.error(error);
    }
  }
  async total(ctx){
    try {
      const res = await totalCarts()
      ctx.body = {
        code:0,
        message:'获取购物车商品总数量成功',
        result: res
      }
    } catch (error) {
      console.error(error);
    }
  }
}
module.exports = new CartController