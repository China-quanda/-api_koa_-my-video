// //导入生成Token的包
const jwt = require('jsonwebtoken')
// //导入全局的配置文件
const { jwt_config } = require('../config/default')
const {TokenExpiredError,invalidToken,hasNotAdminPermission}= require('../constant/err.type')

// 登录认证
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

//授权 判断是不是管理员 
const hadAdminPermission =async (ctx,next)=>{
  const {is_admin} = ctx.state.user
  if(!is_admin){
    console.error('该用户没有管理员的权限！',ctx.state.user);
    return ctx.app.emit('error',hasNotAdminPermission,ctx)
  }
  await next()
}

module.exports= {
  auth,
  hadAdminPermission,
}