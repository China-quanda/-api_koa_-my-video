// //导入生成Token的包
const jwt = require('jsonwebtoken')
// //导入全局的配置文件
const { jwt_config } = require('../config/default')
const {TokenExpiredError,invalidToken}= require('../constant/err.type')

const auth = async (ctx,next)=>{
  const {authorization} = ctx.request.header
  const token = authorization.replace('Bearer ','')

  try {
    const user = jwt.verify(token,jwt_config.jwtSecretKey)
    ctx.state.user = user
  } catch (error) {
    switch (error.name) {
      case 'TokenExpiredError':
        console.error('token已过期！',error);
        return ctx.app.emit('error',TokenExpiredError,ctx)
      case 'JsonWebTokenError':
      console.error('无效的token！',error);
      return ctx.app.emit('error',invalidToken,ctx)
    }
  }


  await next()
}

module.exports= {
  auth
}