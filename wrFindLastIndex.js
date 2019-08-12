
/**
 * 和findIndex类似，只不过从后面往前遍历
 * @param {*} array 
 * @param {*} predicate 
 * @param {*} fromIndex 
 */
function findLastIndex(array, predicate = null, fromIndex = array.length - 1) {
  if (predicate == null) return 0;
  let res = -1;
  let type = getType(predicate)
  for (let i = fromIndex; i > -1; i--) {
    let val = array[i]
    let cur = false;
    switch (type) {
      case 'function':
        cur = predicate(val)
        break;
      case 'string':
        return findLastIndex(array, property(predicate), fromIndex)
      case 'array':
        return findLastIndex(array, matchesProperty(predicate[0], predicate[1]), fromIndex)
      case 'object':
        return findLastIndex(array, matches(predicate), fromIndex)
      default:
        break;
    }
    if (cur) {
      res = i;
      break;
    }
  }
  return res;
}