
// //导入生成Token的包
const jwt = require('jsonwebtoken')
// //导入全局的配置文件
const { jwt_config } = require('../config/default')

const { createUser ,getUserInfo,updateById} = require('../service/user.service')

const { userRegisterError,updatePasswordError } = require('../constant/err.type')


class UserController {
  /**
   * 注册用户
   * @param {*} ctx 
   * @param {*} next 
   * @returns 
   */
  async register(ctx, next) {
    // 1,获取数据
    const { user_name, password } = ctx.request.body
    // 合法性
    // if (!user_name || !password) {
    //   console.error('用户名或密码为空', ctx.request.body);
    //   ctx.status = 400
    //   return ctx.body = {
    //     code: '10001',
    //     message: '用户名或密码为空',
    //     resule: ''
    //   }
    // }
    // 合理性
    // if (await getUserInfo({ user_name })) {
    //   ctx.status = 409
    //   return ctx.body = {
    //     code: '10002',
    //     message: '用户已经存在',
    //     result: ''
    //   }
    // }
    //  用户名可以使用 对密码进行加密 再存储到数据库
    // const hasPwd = bcrypt.hashSync(password, 10)
    // 2，操作数据库 之前加上try 
    try {
      const res = await createUser(user_name, password)
      // 3，返回结果
      ctx.body = {
        code: 0,
        message: '用户注册成功ok',
        result: {
          id: res.id,
          user_name: res.user_name
        }
      }
    } catch (err) {
      console.error(err)
      console.log(err);
      cxt.app.emit('error', userRegisterError, ctx)
    }

  }

  async login(ctx, next) {
    const { user_name } = ctx.request.body
  //  获取用户信息
  try {
     const { password,paypassword, ...res} = await getUserInfo({ user_name })
     ctx.body = {
       code:0,
       message:'用户登录成功ok',
       result:{ //'Bearer '+
         token:jwt.sign(res, jwt_config.jwtSecretKey, { expiresIn: jwt_config.expiresIn })
       }
     }
  } catch (error) {
    console.error('用户登录失败！',error);
  }
  }

  async changePassword(ctx,next){
    // 1获取数据
      const id =ctx.state.user.id
      const password = ctx.request.body.password
       // 判断用户输入的旧密码是否正确
       // 正确的话更新数据库中的密码
       //对新密码进行bcrypt加密处理
    // 2操作数据库
    try {
      if(await updateById({id,password})){
        // 3返回结果
        ctx.body = {
          code:0,
          message: '修改密码成功ok',
          result: ''
        }
      }
    } catch (error) {
      console.error('修改密码失败！', error);
      ctx.app.emit('error', updatePasswordError,ctx)
    }
    
  }
}
module.exports = new UserController()

