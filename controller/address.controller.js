const {createAddress,findAllAddress,updateAddress,removeAddress,setDefaultAddress} = require('../service/address.service')

class AddressCollection{
async create(ctx){
  const user_id = ctx.state.user.id
  const {consignee,phone,address} = ctx.request.body
  try {
    const res = await createAddress({user_id,consignee,phone,address})
    ctx.body={
      code:0,
      message:'添加地址成功ok',
      result: res
    }
  } catch (error) {
    console.error(error);
  }
}
async findAll(ctx){
  const user_id = ctx.state.user.id
  try {
    const res = await findAllAddress(user_id)
    ctx.body = {
      code:0,
      message:'获取地址列表成功ok',
      result: res
    }
  } catch (error) {
    console.error(error);
  }
}
async update(ctx){
  const id = ctx.request.params.id;
  const res = await updateAddress(id,ctx.request.body)
  try {
    ctx.body = {
      code:0,
      message:'更新地址成功ok',
      result: res
    }
  } catch (error) {
    console.error(error);
  }
}
async remove(ctx){
  try {
    const id = ctx.request.params.id;
    const res = await removeAddress(id);
    ctx.body={
      code:0,
      message:'删除地址成功ok',
      result:res
    }
  } catch (error) {
    console.error(error);
  }
}
async setDefault(ctx){
  const id = ctx.request.params.id;
  const user_id = ctx.state.user.id
  try {
    const res = await setDefaultAddress(user_id,id)
    ctx.body={
      code:0,
      message:'设置默认地址成功ok',
      result:res
    };
  } catch (error) {
    console.error(error);
  }
}

}

module.exports = new AddressCollection();