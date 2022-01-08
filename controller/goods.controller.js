
const fs = require("fs");
const path = require('path')
const rand = require("../utils/rand");
const { upload_config } = require("../config/default");
const { createGoods,updateGoods,removeGoods,restoreGoods ,findGoods} = require("../service/goods.service");
const { fileuploadError,unSupportedFileType,publishGoodsError,updateGoodsError,invalidGoodsID } = require("../constant/err.type");

class GoodsController {
  // 上传商品图片
  async upload(ctx, next) {
    // 上传单个文件
    const { file } = ctx.request.files; // 获取上传文件
    if (!file) return ctx.app.emit("error", fileuploadError, ctx); //如果文件为空提示错误
    //还需要判断上传的文件类型合不合法
    const filetype = new Set(upload_config.img_upload_type);
    if (!filetype.has(file.type))return ctx.app.emit("error", unSupportedFileType, ctx);
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath =path.join(__dirname, "../uploads/img") + `/${rand(6)}` + `${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);

    ctx.body = {
      code: 0,
      message: "商品图片上传成功",
      goods_img: `http://${ctx.headers.host}/uploads/img/${file.name}`
    };
    // 2，操作数据库
    // const res = await testservice(name,pwd)
  }
  // 发布商品
  async create(ctx, next) {
    try {
      const {updated_at,created_at,...res} = await createGoods(ctx.request.body)
      ctx.body={
        code:0,
        message:'发布商品成功ok',
        result:res
      }
    } catch (error) {
      console.error('发布商品失败!',error);
      ctx.app.emit('error',publishGoodsError,ctx)
    }

    // ctx.body='发布商品'
  }
  // 修改商品 根据id
  async update(ctx,next){
    try {
      const res = await updateGoods(ctx.params.id,ctx.request.body)
      if(!res) return ctx.app.emit('error',invalidGoodsID,ctx)
      ctx.body = {
        code:0,
        message:'修改商品成功ok',
        result:''
      }
    } catch (error) {
      console.error('修改商品失败！',error); 
      ctx.app.emit('error',updateGoodsError,ctx)

    }
  }
  // 删除商品 根据id 软删除 下架
  async remove(ctx, next){
    try {
      const res = await removeGoods(ctx.params.id)
      if(!res)return ctx.app.emit('error',invalidGoodsID,ctx)
      ctx.body={
        code:0,
        message:'删除商品成功ok', //下架了
        result:''
      }
    } catch (error) {
      console.error('删除商品失败!',error);
    }
  }
  // 恢复软删除掉的商品  上架
  async restore(ctx, next){
    try {
      const res = await restoreGoods(ctx.params.id)
      if(!res)return ctx.app.emit('error',invalidGoodsID,ctx)
      ctx.body={
        code:0,
        message:'恢复商品成功ok', //上架了
        result:''
      }
    } catch (error) {
      console.error('恢复商品失败!',error);
    }
  }
  // 查询所有商品  获取商品列表
  async findAll(ctx, next){
    //1,解析pageNum和pagSize
    const {pageNum=1,pageSize=10}=ctx.request.query
    //2,掉用数据处理相关的方法
    try {
      const res = await findGoods(pageNum,pageSize)
      //3,返回结果
       ctx.body = {
         code:0,
         message:'获取商品列表成功ok',
         result: res
       }
    } catch (error) {
      console.error(error);
    }
    
  }
}
module.exports = new GoodsController();

