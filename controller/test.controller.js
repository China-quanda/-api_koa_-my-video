const {testservice} = require('../service/test.service')
class TestController{
  async testfn(ctx,next){
    // 1,获取数据
    const {name,pwd} = ctx.request.body
    // 2，操作数据库
    const res = await testservice(name,pwd)
    console.log(res);
    // 3，返回结果
    ctx.body = 'test'
  }
  
}
module.exports = new TestController()  


// const { logger, dblogger, accesslogger } = require('../logs/index')
// const { db, sequelize, Sequelize } = require('../db')
// const response = require('../utils/response')
// const fs = require('fs')
// const path = require('path')
// const rand = require('../utils/rand')
// const {upload_config} = require('../config/default')
// exports.test = async ctx => {
//   // 上传单个文件
//   const file = ctx.request.files.file; // 获取上传文件
//   if (!file) return response.error(ctx, '文件不能为空！')
//   //还需要判断上传的文件类型合不合法
//   const filetype = new Set(upload_config.img_upload_type)
//   if(!filetype.has(file.type)) return response.error(ctx, '不支持上传该文件类型')
    
//   // 创建可读流
//   const reader = fs.createReadStream(file.path);
//   let filePath = path.join(__dirname, '../uploads/img') + `/${rand(6)}`+ `${file.name}`;
//   // 创建可写流
//   const upStream = fs.createWriteStream(filePath);
//   // 可读流通过管道写入可写流
//   reader.pipe(upStream);
//   return response.success(
//     ctx,
//     data = {
//       name: file.name, //文件名称
//       path: file.path, //临时存放地址
//       url: 'http://' + ctx.headers.host + '' + filePath, //上传后地址
//       type: file.type, //文件类型
//       size: file.size,//文件大小
//       lastModifiedDate: file.lastModifiedDate //修改日期
//     },
//     '上传成功ok'
//   )
// }