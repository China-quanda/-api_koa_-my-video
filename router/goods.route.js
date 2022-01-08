// 导入路由
const Router = require("koa-router");
// auth 验证用户是否登录中间件    .hadAdminPermission 判断用户有没有管理员权限
const { auth, hadAdminPermission } = require("../middleware/auth.middleware");
const {validator} = require("../middleware/goods.middleware")
// 导入处理user的路由函数模块
const { upload ,create,update,remove,restore,findAll} = require("../controller/goods.controller");
// const user = new Router({ prefix: '/user' })
// 实例化路由对象      { prefix: '/user' }) 开启路由前缀
const goods = new Router({ prefix: "/goods" });

// 商品图片上传接口
goods.post("/upload", auth,hadAdminPermission, upload);
// 发布商品接口
goods.post("/", auth,hadAdminPermission, validator,create);
// 修改商品接口
goods.put("/:id", auth,hadAdminPermission, validator,update);
// 删除商品接口 硬删除
// goods.delete("/:id", auth,hadAdminPermission,remove);
// 删除商品接口 软删除 下架商品
goods.post("/:id/off", auth,hadAdminPermission,remove);
// 上架 恢复软删除的商品
goods.post("/:id/on", auth,hadAdminPermission,restore);
// 获取商品列表
goods.get("/",findAll);

module.exports = goods;
