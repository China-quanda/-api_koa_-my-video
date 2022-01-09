module.exports = {
  userFormateError: {
    code: '10001',
    message: '用户名或密码为空!',
    result: '',
  },
  userExisted: {
    code: '10002',
    message: '用户已经存在!',
    result: '',
  },
  userRegisterError: {
    code: '10003',
    message: '用户注册错误!',
    result: '',
  },
  userDoesNotExist: {
    code: '10004',
    message: '用户不存在!',
    result: '',
  },
  userLoginError: {
    code: '10005',
    message: '用户登录失败！',
    result: '',
  },
  invalidPassword: {
    code: '10006',
    message: '您输入的密码不正确!',
    result: '',
  },
  TokenExpiredError: {
    code: '10101',
    message: 'token已过期！',
    result: '',
  },
  invalidToken: {
    code: '10102',
    message: '无效的token!',
    result: '',
  },
  updatePasswordError: {
    code: '10007',
    message: '修改密码失败!',
    result: '',
  },
  hasNotAdminPermission: {
    code: '10103',
    message: '该用户没有管理员的权限!',
    result: '',
  },
  fileuploadError: {
    code: '10201',
    message: '商品图片上传失败!',
    result: '',
  },
  unSupportedFileType: {
    code: '10202',
    message: '不支持上传该文件类型!',
    result: '',
  },
  goods_nameNotNull: {
    code: '10203',
    message: '商品名称不能为空!',
    result: '',
  },
  goods_priceNotNull: {
    code: '10204',
    message: '商品价格不能为空!',
    result: '',
  },
   goods_numNotNull: {
    code: '10205',
    message: '商品数量不能为空!',
    result: '',
  }, 
  goods_imgNotNull: {
    code: '10206',
    message: '商品图片不能为空!',
    result: '',
  },
  publishGoodsError:{
    code: '10207',
    message: '发布商品失败!',
    result: '',
  },
  updateGoodsError:{
    code: '10208',
    message: '修改商品失败!',
    result: '',
  },
  invalidGoodsID:{
    code: '10208',
    message: '操作的商品信息不存在!',
    result: '',
  },
  goods_idNotNull:{
    code: '10209',
    message: '商品id不能为空!',
    result: '',
  },
  goodsNumber:{
    code: '10210',
    message: '商品id必须是number类型!',
    result: '',
  },
  validatorGoodsnumber:{
    code: '10211',
    message: '商品数量必须是number类型!',
    result: '',
  },
  validatorGoodsselected:{
    code: '10212',
    message: '商品查询必须是Boolean类型!',
    result: '',
  },
  validatornumberselected:{
    code: '10213',
    message: 'number和selected不能同时为空!',
    result: '',
  },
  validatorarr:{
    code: '10214',
    message: 'ids不能为空',
    result: '',
  }
}