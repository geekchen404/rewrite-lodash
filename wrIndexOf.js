
/**
 * 返回从formindex的下标开始找第一个是value的数据的下标
 * @param {*} array 
 * @param {*} value 
 * @param {*} fromIndex 
 */
function indexOf(array, value, fromIndex = 0) {
  let i = fromIndex;
  for (i; i < array.length; i++) {
    if (array[i] == value) {
      return i;
    }
  }
  return -1;
}

/**
 * 返回从formindex的下标从后往前开始找第一个是value的数据的下标
 * @param {*} array 
 * @param {*} value 
 * @param {*} fromIndex 
 */
function lastIndexOf(array, value, fromIndex = array.length - 1) {
  let i = fromIndex;
  for (i; i > -1; i--) {
    if (array[i] == value) {
      return i;
    } else if (array[i] !== value && value !== value) {
      return i;
    }
  }
  return -1;
}

/**
 * 去掉数组的最后一个元素
 * @param {*} ary 
 */
function initial(ary) {
  ary.pop()
  return ary;
  // return ary.slice(0, ary.length - 1)
}

function uniq(array) {
  let data = {}
  let res = []
  for (let val of array) {
    if (!(data[val])) {
      res.push(val)
      data[val] = val;
    }
  }
  return res;
}

/**
 * 将 array 中的所有元素转换为由 separator 分隔的字符串。
 * @param {*} array 
 * @param {*} param1 
 */
function join(array, separator = ',') {
  return array.toString().replace(/\,/g, separator)
}

/**
 * 返回数组最后一个元素
 * @param {*} array 
 */
function last(array) {
  return array[array.length - 1]
}


/**
 * 返回数组的第几个元素，接受负数
 * @param {*} array 
 * @param {*} n 
 */
function nth(array, n = 0) {
  return n < 0 ? array[array.length + n] : array[n]
}


// function pull(array, ...values) {
//   if (values.length == 0) return array;
//   let res = []
//   for (let val of values) {

//   }
//   return res;
// }