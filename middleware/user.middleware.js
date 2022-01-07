// 导入密码加密包
const bcrypt = require('bcryptjs')
const { getUserInfo } = require('../service/user.service')
const { userFormateError,
  userExisted,
  userRegisterError,
  userDoesNotExist,
  userLoginError,
  invalidPassword,
} = require('../constant/err.type')

// 检测用户名和密码不能为空的自定义中间件
const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body
  // 合法性
  if (!user_name.trim() || !password.trim()) {
    console.error('用户名或密码为空!', ctx.request.body);
    return ctx.app.emit('error', userFormateError, ctx)
    // ctx.status = 400
    // return ctx.body = {
    //   code: '10001',
    //   message: '用户名或密码为空',
    //   resule: ''
    // }

  }
  await next()
}

// 查询用户是否存在的自定义中间件
const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body
  // 合理性
  try {
    const res = await getUserInfo({ user_name })
    if (res) {
      console.error('用户已经存在!', user_name);
      return ctx.app.emit('error', userExisted, ctx)
    }
  } catch (error) {
    console.error('获取用户信息错误', error);
    return ctx.app.emit('error', userRegisterError, ctx)
  }

  await next()
}

// 加密用户密码的中间件
const crpytPassword = async (ctx, next) => {
  const { password } = ctx.request.body
  const salt = bcrypt.genSaltSync(10)
  const hasPwd = bcrypt.hashSync(password, salt)
  ctx.request.body.password = hasPwd
  await next()
}

//
const verifyLogin = async (ctx, next) => {

  const { user_name, password } = ctx.request.body

  // 1,判断用户是否存在 不存在 报错
  try {
    const res = await getUserInfo({ user_name })
    if (!res) {
      console.error('用户名不存在!', user_name);
      return ctx.app.emit('error', userDoesNotExist, ctx)
    }
    // 2，密码是否匹配 不匹配  报错
    if (! bcrypt.compareSync(password, res.password)) {
      return ctx.app.emit('error', invalidPassword, ctx)
    }
  } catch (error) {
    console.error('用户登录失败！', error);
    return ctx.app.emit('error', userLoginError, ctx)
  }

  await next();
}

module.exports = {
  userValidator,
  verifyUser,
  crpytPassword,
  verifyLogin,
}