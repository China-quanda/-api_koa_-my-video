 /**
  * 
  * @param {*} 统一返回响应消息
  */

 /**
  * 
  * @param {Context} ctx 上下文
  * @param {*} data 返回数据
  * @param {string} msg 成功提示消息
  * @param {number} code 状态码
  */
 exports.success=(ctx,data=[],msg='success',code=0)=> {
   ctx.body = {
    code,msg,data
   }
 }

  /**
  * 
  * @param {Context} ctx 上下文
  * @param {string} msg 提示消息
  * @param {*} data 扩展提示
  * @param {number} code 状态码
  */
 exports.error=(ctx,msg='error',data=[],code=1)=> {
  ctx.body = {
    code,msg,data
   }
}