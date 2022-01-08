const { DataTypes } = require('sequelize');
const seq = require('../db/seq')

const Goods = seq.define('goods', {
  // 在这里定义模型属性
  // id会被sequlize自动创建管理  所以不用写
  goods_name: { //字段
    type: DataTypes.STRING, // VARCHAR(255)
    allowNull: false, // allowNull 默认为 true 不能为空设置为 false , 
    omment: '商品名称'   //注释
  },
  goods_price: {
    type: DataTypes.DECIMAL(10,2), //价格用这个
    allowNull: false,
    comment:'商品价格',
  },
  goods_num:{
    type: DataTypes.BIGINT, //整型用这个
    allowNull: false,
    comment:'商品库存',
  },
  goods_img:{
    type: DataTypes.STRING, 
    allowNull: false,
    comment:'商品图片',
  },
}, {
  paranoid:true, //参数传递给模型定义. Paranoid 需要时间戳才能起作用(即,如果你传递 timestamps: false 了,paranoid 将不起作用)你还可以将默认的列名(默认是 deletedAt)更改为其他名称.
  // 这是其他模型参数
  freezeTableName: true,  //强制表名称等于模型名称
  // timestamps: false //时间戳
});

// Goods.sync({ force: true }) //-强制 将创建表,如果表已经存在,则将其首先删除再创建


module.exports = Goods