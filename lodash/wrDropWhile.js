/**
 * 这个函数和dropRightWhile很相似，一个从前往后遍历，一个从后往前遍历，
 * 一个删除遇到第一个false的后面的所有数据
 * 一个删除遇到的最后一个false的之前的数据，保留后面的数据
 * @param {Array} array 
 * @param {Function} predicate 
 */
function dropWhile(array, predicate = null) {
  if (predicate == null) return array;
  let n = 0;
  let type = typeof predicate;
  if (predicate instanceof Array) type = 'array'
  for (let i = 0; i < array.length; i++) {
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
  return array.slice(n);
}