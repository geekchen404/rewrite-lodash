
/**
 * 接受数组作为键值对，返回一个对象
 * 不需要实现，深对象，只是浅实现
 * 所以数组也只是二维数组
 * @param {Array} pairs 
 */
function fromPairs(pairs) {
  let res = {};
  for (let val of pairs) {
    res[val[0]] = val[1]
  }
  return res;
}