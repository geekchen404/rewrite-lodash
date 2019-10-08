
/**
 * 移除数组array中所有和给定值相等的元素，进行全等比较。 
 * 这个是改变原数组的函数，而不是返回新的函数
 */

function pull(array, ...values) {
  let res = []
  array.map(it => values.indexOf(it) == -1 ? res.push(it) : '')
  return array = res;
}





/**
 * 和pull类似，但是只接受两个参数
 * 第二个需要对比的参数为一个数组
 *  [1, 2, 3, 1, 2, 3]&[2,3]=>[1,1]
 * 严谨做法
 */

function pullAll(array, values) {
  let n = array.length;
  for (let i = 0; i < n; i++) {
    // 如果包含的话
    if (values.includes(array[i])) {
      array.splice(i--, 1)
    }
  }
  return array;
}


/**
 * 通过第三个迭代器来决定怎么对比array和values中的每个值
 * 也需要改变原数组
 * 
 * @param {Array} array 
 * @param {Array} values 
 * @param {Array|Function|Object|string} iteratee 
 */
function pullAllBy(array, values, iteratee = null) {
  if (iteratee == null) {
    return pullAll(array, values)
  } else {
    let type = getType(iteratee)
  }
}