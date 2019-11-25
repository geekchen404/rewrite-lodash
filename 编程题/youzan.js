/**
 * 这个文件用于面试的准备，会涉及正则，字符串解析，promise的实现，async的实现以及算法的准备等
 */


/**
 * 一个浏览器打开一个url的过程
 */


/**
 * Promise的实现 
 */

class WrPromise {
  constructor() {

  }
}

/**
 * async/await的实现
 */

/**
 * JSON.parse()
 */

/**
 * 排序总结
 */
var array1 = [8, 6, 2, 5, 1, 4, 9, 7, 3]
var array2 = [8, 6, 2, 5, 1, 4, 9, 7, 3]
/**
 * 将传入的数组和指定的下标的值交换
 * @param {*} ary 
 * @param {*} i 
 * @param {*} j 
 */
function swap(ary, i, j) {
  let temp = ary[i]
  ary[i] = ary[j]
  ary[j] = temp
}
/**
 * 冒泡排序
 * @param {*} ary 
 */
function bubbleSort(ary) {
  let length = ary.length
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      if (ary[j] < ary[i]) {
        swap(ary, i, j)
      }
    }
  }
  return ary
}
bubbleSort(array1)

/**
 * 冒泡优化，每一趟得到最大最小值，缩小循环的范围
 * @param {*} ary 
 */
function bubbleBetterSort(ary) {
  let max = null
  let maxId = null
  let length = ary.length
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      // 如果前面的大于后面的就交换
      if (ary[i] > ary[j]) {
        swap(ary, i, j)
      }
      if (max == null || max < ary[j]) {
        max = ary[j]
        maxId = j
      }
    }
    // 这个时候只要最大值的id不是最后一个，就交换这两个值
    if (maxId && maxId !== length - 1) {
      swap(ary, maxId, length - 1)
      max = null
      maxId = null
    }
    length--
  }
  return ary;
}
bubbleBetterSort(array2)


/**
 * 归并排序
 * @param {*} nums 
 */
function divide(nums) {
  let n = nums.length;
  if (n < 2) return nums;
  n = Math.floor(n / 2)
  let left = nums.slice(0, n)
  let right = nums.slice(n)
  return concat(divide(left), divide(right))
  function concat(left, right) {
    let res = []
    while (left.length && right.length) {
      if (left[0] <= right[0]) {
        res.push(left.shift())
      } else {
        res.push(right.shift())
      }
    }
    while (left.length) {
      res.push(left.shift())
    }
    while (right.length) {
      res.push(right.shift())
    }
    return res;
  }
}


/**
 * 深拷贝浅拷贝
 */


/**
 * 正则相关
 */


/**
 * react相关
 */


/**
 * reduce相关
 */