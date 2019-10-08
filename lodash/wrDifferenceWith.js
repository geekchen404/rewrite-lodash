
/**
 * 通过comparatorb比较器，比较前面两个数组是否有相同的数据，
 * 筛选数组1不同于数组2的数据，返回数据集合数组
 * @param {Array} array 
 * @param {...Array} values 
 * @param {Function} comparator (array, values )
 */
function differenceWith(array, values = null, comparator = null) {
  if (values == null) return array;
  let res = []
  for (let a of array) {
    let cur = true;
    for (let val of values) {
      if (comparator == null) {
        if (a == val) {
          cur = false;
          break;
        }
      } else {
        if (comparator(a, val)) {
          cur = false;
          break;
        }
      }
      cur == false ? '' : res.push(a)
    }
  }
  return res;
}