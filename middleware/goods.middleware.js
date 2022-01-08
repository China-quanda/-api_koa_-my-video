const {goods_nameNotNull,goods_priceNotNull,goods_numNotNull,goods_imgNotNull} = require('../constant/err.type')

// 验证字段不能为空
const validator = async (ctx, next) => {
  const {goods_name,goods_price,goods_num,goods_img} = ctx.request.body
  if(!goods_name)return ctx.app.emit('error',goods_nameNotNull,ctx)
  if(!goods_price)return ctx.app.emit('error',goods_priceNotNull,ctx)
  if(!goods_num)return ctx.app.emit('error',goods_numNotNull,ctx)
  if(!goods_img)return ctx.app.emit('error',goods_imgNotNull,ctx)

  await next()
}


module.exports = {
  validator
}