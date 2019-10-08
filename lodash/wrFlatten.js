
/**
 * 将数组，降低一个层级
 * @param {Array} ary 
 */
function flatten(ary) {
  return [].concat(...ary)
}

/**
 * 将数组递归为一维数组
 * @param {*} ary 
 */
function flattenDeep(ary) {
  let res = []
  for (let val of ary) {
    if (val instanceof Array) {
      let cur = flattenDeep(val)
      res = res.concat(cur)
    } else {
      res.push(val)
    }
  }
  return res;
}

/**
 * 将数组按照数字要求降维
 * @param {Array} ary 
 * @param {Number} depth 
 */
function flattenDepth(ary, depth = 1) {
  let res = []
  if (depth == 0) return ary;
  for (let val of ary) {
    if (val instanceof Array) {
      let cur = flattenDepth(val, depth - 1)
      res = res.concat(cur)
    } else {
      res.push(val)
    }
  }
  return res;
}
