/**
 * 这里理解题意很重要
 * 从右往左遍历，需要去掉当遇到第一个false的时候的所有后面的数据，返回第一个false的位置的内容
 * @param {Array} array 
 * @param {Function/Object/Array/String} param1 
 * 因为数组和对象是一样的遍历方式，所以不需要判断是否是数组
 */

function dropRightWhile(array, predicate = null) {
  if (predicate == null) return array;
  let n = array.length;
  let type = typeof predicate;
  if (predicate instanceof Array) type = 'array'
  for (let i = n - 1; i > -1; i--) {
    let val = array[i]
    let cur = true;
    switch (type) {
      case 'string':
        cur = val[predicate]
        break;
      case 'function':
        cur = predicate(val, i, array)
        break;
      case 'object':
        for (let v in predicate) {
          if (val[v] !== predicate[v]) {
            cur = false;
            break;
          }
        }
        break;
      case 'array':
        for (let v = 0; v < predicate.length; v++) {
          if (predicate[v + 1] !== undefined) {
            if (val[predicate[v]] !== predicate[v + 1]) {
              cur = false;
              break;
            }
          }
        }
        break;
      default:
        break;
    }
    if (cur == false) {
      n = i;
      break;
    }
  }
  return array.slice(0, n + 1);
}