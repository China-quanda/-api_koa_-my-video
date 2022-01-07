const { Sequelize, DataTypes } = require('sequelize');
const seq = require('../db/seq')

const Test = seq.define('test', {
  // 在这里定义模型属性
  // id会被sequlize自动创建管理  所以不用写
  user_name: { //字段
    type: DataTypes.STRING, // VARCHAR(255)
    allowNull: false, // allowNull 默认为 true 不能为空设置为 false , 
    unique: true, //唯一的 // unique 属性是创建唯一约束的简写.
    omment: '用户名，唯一'   //注释
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    comment:'密码',
  },
  is_admin:{
    type: DataTypes.BOOLEAN, //布尔
    allowNull: false,
    defaultValue:0, //设置默认值
    comment:'是否为管理 1 true ｜ 0 false',
  }
}, {
  // 这是其他模型参数
  freezeTableName: true,  //强制表名称等于模型名称
  // timestamps: false //时间戳
});


// User.sync() - 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
Test.sync({ force: true }) //-强制 将创建表,如果表已经存在,则将其首先删除再创建
// User.sync({ alter: true }) - 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.

// `sequelize.define` 会返回模型
// console.log(Test === seq.models.Test); // true


module.exports = Test