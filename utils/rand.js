
/**
 * 
 * @param {int} length 生成*位随机数 默认为6位
 * @returns 
 */
module.exports=(length=6)=>{
  let Num="";
  for(var i=0; i<length; i++){
     Num+=Math.floor(Math.random()*10);
  }
  return Num;
}
