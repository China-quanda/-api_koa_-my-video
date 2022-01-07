
// //导入生成Token的包
// const jwt = require('jsonwebtoken')
// //导入全局的配置文件
// const {jwt_config} = require('../config/default')

const { createUser} = require('../service/user.service')

const {userRegisterError} =require('../constant/err.type')


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
      cxt.app.emit('error', userRegisterError,ctx)
    }
    
  }

  async login(ctx,next){
    const { user_name } = ctx.request.body
    
    ctx.body = '登录'
  }


}
module.exports = new UserController()



// //导入数据库模块 操作数据库
// const mysql = require('../utils/mysql')
// //导入密码加密包
// const bcrypt = require('bcryptjs')
// //导入生成Token的包
// const jwt = require('jsonwebtoken')
// //导入全局的配置文件
// const {jwt_config} = require('../config/default')

// // 注册
// exports.reguser = async (ctx) => {
//   //获取客户端提交到服务器的用户信息
//   const { mobile, password } = ctx.request.body
//   //对表单中的数据，进行合法性的校验
//   if (!mobile ) return ctx.throw(400, '用户名不能为空')
//   if (!password) return ctx.throw(400, '密码不能为空')
//   if (mobile.length > 11 || mobile.length < 11) return ctx.throw(400, '手机号码格式错误！')
//   //定义sql语句 查询用户名是否被占用
//   const sql = `select * from users where mobile=${mobile}`
//   //执行sql语句 
//   let result = await new Promise((resolve, reject) => {
//     return mysql.query(sql, (err, data) => {
//       //执行sql语句失败
//       if (err) return reject(err);
//       //判断用户名是否被占用
//       if (data.length > 0) return reject({ status: 400, message: '用户名被占用，请更换其他用户名！' });
//       //  用户名可以使用 对密码进行加密 再存储到数据库
//       hasPwd = bcrypt.hashSync(password, 10)
//       mysql.query(`INSERT INTO users (mobile, password) values (${mobile}, '${hasPwd}')`, (error, datas) => {
//         //执行sql失败
//         if (error) return reject(error);
//         //sql语句执行成功，但影响行数不为1
//         if (datas.affectedRows !== 1) return reject({
//           status: 400,
//           message: '注册失败，请稍后再试！',
//         })
//         return resolve({
//           status: 200,
//           message: '注册成功ok',
//         })

//       })


//     })

//   })

//   console.log(result);
//   ctx.body = result
// }

// // 登录
// exports.login = async (ctx) => {
//   //获取客户端提交到服务器的用户信息
//   const { mobile, password } = ctx.request.body
//   //定义sql语句 查询用户名是否被占用
//   const sql = `select * from users where mobile=${mobile}`
//   //执行sql语句 根据用户名查询用户信息
//   let result = await new Promise((resolve, reject) => {
//     return mysql.query(sql, (err, data) => {
//       //执行sql语句失败
//       if (err) return reject(err);
//       //判断密码是否正确
//       const hasPwd = bcrypt.compareSync(password, data[0].password)
//       if (!hasPwd) return reject({ status: 400, message: '用户名或密码错误！' });
//       //确认密码正确后 生成JWT的token字符串
//       const user = { ...data[0], password: '' }
//       //对用户的信息进行加密 生成token字符串
//       const tokenStr = jwt.sign(user, jwt_config.jwtSecretKey, { expiresIn: jwt_config.expiresIn })
//       //响应给客户端
//       return resolve({
//         status: 200,
//         message: '登录成功ok',
//         token: 'Bearer ' + tokenStr
//       })

//     })

//   })

//   ctx.body = result
//   console.log(result);
// }

