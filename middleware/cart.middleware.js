const { goods_idNotNull, goodsNumber ,validatorGoodsnumber,validatorGoodsselected,validatornumberselected,validatorarr} = require('../constant/err.type')

const validatorGoodsID = async (ctx, next) => {
  const { goods_id } = ctx.request.body
  if (!goods_id) {
    console.error('商品id不能为空！', goods_id);
    return ctx.app.emit('error', goods_idNotNull, ctx)
  }
  // 默认goods_id是string类型 parseInt（）转换成number 。转换后如果解析不到数字，则将返回一个NaN的值，可以用isNaN()函数来检测；
  if (isNaN(parseInt(goods_id))) {
    console.error('商品id必须是number类型', goods_id);
    return ctx.app.emit('error', goodsNumber, ctx)
  }
  await next()
}

const validatorGoodsNumber = async (ctx, next) => {
  const { number } = ctx.request.body
  // 默认goods_id是string类型 parseInt（）转换成number 。转换后如果解析不到数字，则将返回一个NaN的值，可以用isNaN()函数来检测；

  if (number) {
    if (isNaN(parseInt(number))) {
      console.error('商品数量必须是number类型', number);
      return ctx.app.emit('error', validatorGoodsnumber, ctx)
    }
  }
  
  await next()
}

const validatorGoodsSelected = async (ctx, next) => {
  const { selected } = ctx.request.body
  if(selected){
    if (!(Boolean(selected))) {
      console.error('商品查询必须是Boolean类型', selected);
      return ctx.app.emit('error', validatorGoodsselected, ctx)
    }
  }
  await next()
  
}

const validatorNumberSelected =async (ctx, next) => {
  const {number,selected} = ctx.request.body
  if(number === undefined && selected === undefined) return ctx.app.emit('error', validatornumberselected, ctx)
  await next()
}

// 必须是数组 和 必填
const validatorArr =async (ctx, next) => {
  const {ids} = ctx.request.body
  if(!ids){
  console.error('ids不能为空!', ids);
  return ctx.app.emit('error', validatorarr, ctx)
}
  await next()
}

module.exports = {
  validatorGoodsID,
  validatorGoodsNumber,
  validatorGoodsSelected,
  validatorNumberSelected,
  validatorArr,
}