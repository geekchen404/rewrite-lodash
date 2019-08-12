/**
 * differenceBy接受多个参数，第一个参数是需要选择的数组，从第二个参数到最后的参数都是选择条件，
 * 若是第一个参数的数据在后面的任意一个条件中存在，则删除，
 * 返回不满足后面所有条件的数据组成的数组
 * @param {Array} ary 
 * @param  {...any} values 
 * @param {Function/Array/Object/String} iteratee 
 */
function differenceBy(ary, ...rest) {
  let res = []
  let iteratee = rest.pop()
  rest = rest.reduce(function add(res, it) {
    return res = res.concat(it)
  }, [])
  // 全是数组的情况
  let type = typeof iteratee;
  if (iteratee instanceof Array) {
    type = 'array'
    rest.push(...iteratee)
  }
  for (let y of ary) {
    let equal = true;
    for (let v of rest) {
      let a = null;
      let b = null;
      switch (type) {
        case 'string':
          a = y[iteratee]
          b = v[iteratee]
          break;
        case 'function':
          a = iteratee(y)
          b = iteratee(v)
          break;
        case 'array':
          a = y;
          b = v;
          break;
        default:
          break
      }
      if (a == b) {
        equal = false;
        break;
      }
    }
    equal == false ? '' : res.push(y);
  }
  return res;
}