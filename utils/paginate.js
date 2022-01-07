// 统一处理分页格式

/**
 * 
 * @param {*} data 数据
 * @param {*} currentPage 当前页
 * @param {*} limit 默认一页10条数据
 * @param {*} total 数据总条数
 * @returns 
 */
exports.paginate = (data = [], currentPage = 1, limit = 10, total = 0) => {
  return {
    data,
    currentPage,
    total,
    totalPage: Math.ceil(total / limit),
    limit
  }
}