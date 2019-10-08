/**
 * 创建一个对象
 * key 是 iteratee 遍历 collection(集合) 中的每个元素返回的结果
 * 分组值的顺序是由他们出现在 collection(集合) 中的顺序确定的
 * 每个键对应的值负责生成 key 的元素组成的数组。iteratee 调用 1 个参数：(value)
 */
function groupBy(collection, iteratee = null) {
  let res = {}
  let key = null;
  // 这里需要判断四种情况，obejct，function，array，string
  let type = typeof iteratee;
  if (iteratee instanceof Array) {
    type = 'array'
  }
  for (let val of collection) {
    key = type == 'string' ? val[iteratee] : iteratee(val)
    if (!res[key]) {
      res[key] = [val]
    } else {
      res[key].push(val)
    }
  }
  return res;
}