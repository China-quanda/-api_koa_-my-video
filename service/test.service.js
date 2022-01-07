class TestService{
  async testservice(name,pwd){
    // TODO:写入数据库
      return '写入数据库成功'
  }
}

module.exports = new TestService()