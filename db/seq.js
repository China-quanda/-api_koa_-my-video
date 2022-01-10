const { Sequelize } = require('sequelize');
const { db_config } = require('../config/default')
const { dblogger } = require('../logs');
const seq = new Sequelize(db_config.database, db_config.user, db_config.password, {
  host: db_config.host,
  port: db_config.port,
  dialect: db_config.protocol,
  // logging: msg => dblogger.info(msg),
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  },
  define: {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  },
});

// const con = async () => {
//   try {
//     await seq.authenticate();
//     // 已成功建立连接
//     console.log('数据库连接成功');
//   } catch (error) {
//     // 无法连接到数据库
//     console.error('数据库连接失败！', error);
//   }
// }


module.exports = seq
