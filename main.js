// 端口号
const {config_app} =require('./config/default')

const app = require('./app')

// 启动服务器并监听3000端口
app.listen(config_app.port, () => {
  console.log(`server is running on http://127.0.0.1:${config_app.port}`);
}) 