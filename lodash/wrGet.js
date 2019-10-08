/**
 * 
 * @param {Object} object 
 * @param {Array/String} path 
 * @param {} defaultValue 
 */

var object = { 'a': [{ 'b': { 'c': 3 } }] };
function get(object, path, defaultValue = null) {
  let res = null;
  // path有两种情况，字符串和数组,字符串需要切割为数组
  if (typeof path == 'string') {
    path = path.split(/(?:\[|(?:\]\[)|\.|(?:\]\.)|\])/)
  }
  for (let i of path) {
    if (object == undefined) break;
    res = object = object[i]
  }
  if (res == null && defaultValue != null) return defaultValue;
  return res;
}
// get(object, 'a[0].b.c');
// // => 3

// get(object, ['a', '0', 'b', 'c']);
// // => 3

// get(object, 'a.b.c', 'default');
// 'default'



function has(object, path) {
  let res = get(object, path, 'undefined')
  if (res == 'undefined' || res == undefined) return false
  return true;
}
has(object, 'a');
has(object, 'a.b');
has(object, ['a', 'b']);
