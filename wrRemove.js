
/**
 * 移除数组中的返回真值的数据
 * @param {*} ary 
 * @param {*} predicate 
 */
function remove(ary, predicate = true) {
  let res = []
  for (let i in ary) {
    if (predicate(ary[i], i, ary)) {
      res.push(ary[i])
    }
  }
  return res;
}