// 导入koa框架
const Koa = require('koa')
// 导入node内置模块path
const path = require('path')
//导入koa2-cors 跨域
const cors = require('koa2-cors')
// 导入自己定义的router文件
const router = require('./router')
// 导入url解析对象   导入解析post解析对象  挂载到ctx.request.body
const koaBody = require('koa-body')
// 导入错误处理中间件
const error = require('koa-json-error')
// 导入static静态资源托管包
const static = require('koa-static')
// 导入统一错误处理
const errHandler = require('./errHandler')

// const AccessLogmiddleware = require('./middleware/AccessLogmiddleware')

// 实例化app对象
const app = new Koa()
const port = 3000 // 端口号

//注册全局可用的中间件


// add.use(AccessLogmiddleware)
// error() 是正常用法  里面配置了对象就是高级用法
app.use(error({
  format: (err) => {
    return { status: err.status || err.statusCode || 500, message: err.message, result: err.stack }
  },
  postFormat: (err, obj) => {
    const { result, ...stack } = obj
    // 如果是生产环境只返回message和code ，开发环境全返回
    return process.env.NODE_ENV === 'production' ? stack : obj
  }
}))

// 这里cors中间件一定要写在路由之前
app.use(cors());

// app.use(mount('/home',static(path.join(__dirname, '/public')))
// 在所有中间件之前注册全局中间件挂载到ctx.request.body
app.use(koaBody({
  multipart: true,
  formidable: {
    // uploadDir: path.join(__dirname, '/uploads'), //文件上传地址
    maxFileSize: 2000 * 1024 * 1024  ,  // 设置上传文件大小最大限制，默认2M
    keepExtensions:true, //保存上传文件的后缀名
  }
}))
// 注册中间件 并配置需要托管的文件目录
// app.use(static('./public'))
app.use(static(path.join(__dirname, '/public')))

// 挂载路由 中间件
app
  .use(router.routes())
  // 访问不到路由会把状态吗改为 501 
  .use(router.allowedMethods())



// 原生的错误处理
// 1，404 当请求的资源找不到，或者没有通过ctx.body返回时，有koa自动返回
// 2，手动抛出：通过ctx.throw手动抛出
// 3，运行时错误 500 时
// 统一错误处理
app.on('error', errHandler)



// 启动服务器并监听3000端口
app.listen(port, () => {
  console.log(`server is running on http://127.0.0.1:${port}`);
}) 