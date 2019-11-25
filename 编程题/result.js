function bigNumberSum(a, b) {
  // 123456789
  // 000009876
  // padding
  let cur = 0;
  while (cur < a.length || cur < b.length) {
    if (!a[cur]) {
      a = "0" + a;
    } else if (!b[cur]) {
      b = "0" + b;
    }
    cur++;
  }

  let carried = 0;
  const res = [];

  for (let i = a.length - 1; i > -1; i--) {
    const sum = carried + +a[i] + +b[i];
    if (sum > 9) {
      carried = 1;
    } else {
      carried = 0;
    }
    res[i] = sum % 10;
  }
  if (carried === 1) {
    res.unshift(1);
  }

  return res.join("");
}


// 深拷贝和浅拷贝
var obj1 = {
  'name': 'zhangsan',
  'age': '18',
  'language': [1, [2, 3], [4, 5]],
};
var obj2 = obj1;
var obj3 = shallowCopy(obj1);
function shallowCopy(src) {
  var dst = {};
  for (var prop in src) {
    if (src.hasOwnProperty(prop)) {
      dst[prop] = src[prop];
    }
  }
  return dst;
}
var obj4 = deepClone(obj1)
function deepClone(value) {
  // 如果不是引用对象就直接返回，注意排查正则，typeof的时候也是object
  if (typeof value !== 'object' || value instanceof RegExp) {
    return value
  }
  let res = value instanceof Array ? [] : {}
  for (let prop in value) {
    // 是复杂类型并且不是null
    if (typeof value[prop] === 'object' && value[prop] !== null) {
      res[prop] = cloneDeep(value[prop])
    } else {
      res[prop] = value[prop]
    }
  }
  return res;
}
// 对于原始类型来说
obj2.name = "lisi";//12都会改变
obj3.age = "20";//只有自己改变了
//对于复杂类型来说，下面两个都改变了1，通过1改变了23
obj2.language[1] = ["二", "三"];
obj3.language[2] = ["四", "五"];
obj4.language[1] = ["xxxx", "eduiehireu"];
console.log(obj1);
console.log(obj2);
console.log(obj3);
console.log(obj4);
// =============================