const User = require('../model/user.model')

class UserService {
  /**
   * 创建 注册用户
   * @param {string} user_name 用户名
   * @param {string} password 密码
   * @returns 
   */
  async createUser(user_name, password) {
    //插入数据
    const res = await User.create({ user_name, password })
    return res.dataValues
  }

  async getUserInfo({...args}){
    const whereOpt = {...args}
    const res = await User.findOne({ 
          attributes:['user_name','email','mobile','is_admin','stutas','password','paypassword'],//
          where: whereOpt
         });
        return res ? res.dataValues : null
  }
  // async getUserInfo({ user_name, email, mobile, is_admin, stutas, }) {
  //   const whereOpt = {}
  //   user_name && Object.assign(whereOpt, { user_name })
  //   email && Object.assign(whereOpt, { email })
  //   mobile && Object.assign(whereOpt, { mobile })
  //   is_admin && Object.assign(whereOpt, { is_admin })
  //   stutas && Object.assign(whereOpt, { stutas })

  //   const res = await User.findOne({ 
  //     attributes:['user_name','email','mobile','is_admin','stutas','password','paypassword'],//
  //     where: whereOpt
  //    });
  //   return res ? res.dataValues : null
  // }
}

module.exports = new UserService()