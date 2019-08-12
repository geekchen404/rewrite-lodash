/**
 * 参数
 * array (Array): 要填充改变的数组。
 * value (*): 填充给 array 的值。
 * [start=0] (number): 开始位置（默认0）。
 * [end=array.length] (number):结束位置（默认array.length）。
 * fill(array, value, [start=0], [end=array.length])
 * 接受四个参数，其中后面两个参数选传，不穿默认为0起点，长度-1为终点
 */


function wrFill(ary, val, start = 0, end = ary.length) {
  for (let i = start; i < end; i++) {
    ary[i] = val
  }
  return ary;
}