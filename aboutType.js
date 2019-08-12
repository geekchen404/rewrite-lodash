/**
 * 这个js是关于一切的类型判断的函数的集合
 * 比如：matches，isMatch,property等等
 * 
 */


/**
 * @function isMatch 
 * 此函数用于对象之间的深度对比,即为：【object是否含有和source【完全】一样的属性值】
 * @param {Object} object 需要判断的对象
 * @param {Object} source 需要进行对比的对象
 * @returns {boolean} true|false
 * @test isMatch({ 'a': 1, 'b': 2 }, { 'b': 2 })=>true
 * @test isMatch({ 'a': 1, 'b': 2 }, { 'b': 1 })=>false
 * @test isMatch({ 'a': 1, 'b': {'c':'wurui','d':[1,2,3,4]}}, { 'b': {'c':'wurui','d':[1,2,3]}})=>true
 * 上面一个测试用例返回true，是因为后面的所有属性及其值，前面都有
 * @test isMatch({ 'a': 1, 'b': {'c':'wurui','d':[1,2,3,4]} }, { 'b': {'c':'wurui','d':[1,2,3,5]}})=>false
 * 这个测试用例的结果为false是因为，后面的d5，不被包含在前面的对象里面
 * !!! 注意不是等价关系，而是包含关系，相等也是包含的一种情况
 */
function isMatch(object, source) {
  // 若是两个对象完全相等，那么就直接返回true
  if (object === source) return true
  for (let i in source) {
    // 需要判断值是否为对象，若是对象递归调用该函数
    if (typeof source[i] == 'object' && source[i] !== null) {
      if (!isMatch(object[i], source[i])) return false;
    } else {
      // 不是对象直接判断是否相等
      if (object[i] !== source[i]) return false;
    }
  }
  return true;
}


/**
 * 通过isMtach实现的mtches函数
 * @param {Object} source 
 */
function matches(source) {
  return function (obj) {
    return isMatch(obj, source)
  }
}


/**
  * 判断两个对象是否完全相等
  * @param {*} obj1 
  * @param {*} obj2 
  * @test isEqual({},{}) =>true
  * @test isEqual([1],[2]) =>false
  * @test isEqual({'a':1,'b':2},{'b'：2}) =>true
  * @test isEqual([1,2],{"0":1,"1":2,"length":2})
  */
function isEqual(obj1, obj2) {
  if (obj1 === obj2) return true;
  if (typeof obj1 === typeof obj2 && Array.isArray(obj1) == Array.isArray(obj2)) {
    if (typeof obj1 == 'object' && typeof obj2 == 'object') {
      for (let i in obj1) {
        if (typeof obj1[i] == 'object' && typeof obj2[i] == 'object') {
          if (!isEqual(obj1[i], obj2[i])) return false;
        } else {
          if (obj1[i] !== obj2[i]) return false
        }
      }
      for (let i in obj2) {
        if (typeof obj1[i] == 'object' && typeof obj2[i] == 'object') {
          if (!isEqual(obj1[i], obj2[i])) return false;
        } else {
          if (obj1[i] !== obj2[i]) return false
        }
      }
      return true;
    } else {
      return obj1 === obj2;
    }
  } else {
    return false;
  }
}

/**
 * 转化 字符串 为属性路径的数组 。
 * toPath('a.b.c')=> ['a', 'b', 'c']
 * toPath('a[0].b.c')=> ['a', '0', 'b', 'c']
 * @param {String} str 
 */
function toPath(str) {//a.b.0.c[fooo][bar].d
  return typeof str == 'string' ? str.split(/\.|\[|\]./g) : str;
}


/**
 * 根据 object对象的path路径获取值,返回该路径下的值，如果没有返回undefined或者defaultVal
 * 如果解析 value 是 undefined 会以 defaultValue 取代。
 * @param {Object} object 
 * @param {Array|string} path 
 * @param {*} defaultVal 
 */
function get(object, path, defaultVal) {
  path = toPath(path)
  for (let val of path) {
    if (object[val] == undefined) return defaultVal
    object = object[val]
  }
  return object;
}

/**
 * 判断path表示的属性路径是否是object的自有属性
 * @param {Object} object 
 * @param {String/Array} path 
 */
function has(object, path) {
  path = toPath(path)
  for (let val of path) {
    if (!object.hasOwnProperty(val)) {
      return false;
    } else {
      object = object[val]
    }
  }
  return true;
}



function property() {

}









function isMatch(obj, src) {
  if (obj === src) {
    return true
  }
  for (var key in src) {//   {a:1},  2
    if (typeof src[key] == 'object' && src[key] !== null) {
      if (!isMatch(obj[key], src[key])) {
        return false
      }
    } else {
      if (obj[key] != src[key]) {
        return false
      }
    }
  }
  return true
}

function bind(f, thisArg, ...fixedArgs) {//1, window, window, 3,
  return function (...args) {//4, 5
    var acturalArgs = [...fixedArgs]
    for (var i = 0; i < acturalArgs.length; i++) {
      if (acturalArgs[i] === window) {
        acturalArgs[i] = args.shift()
      }
    }
    acturalArgs.push(...args)
    return f.apply(thisArg, acturalArgs)
  }
}

function matches(src) {
  return function (obj) {
    return isMatch(obj, src)
  }
}
var matches = src => bind(isMatch, null, window, src)


var isMale = matches({ gender: 'male' })
isMale({
  name: 'zhangshan',
  age: 18,
  gender: 'male',
})

function toPath(str) {//a.b.0.c[fooo][bar].d
  return str.split(/\.|\[|\]./g)
}

function get(obj, path, defaultVal) {//[a,b,c,d]
  var path = toPath(path)
  for (var i = 0; i < path.length; i++) {
    if (obj === undefined) {
      return defaultVal
    }
    obj = obj[path[i]]
  }
  return obj
}

function get(obj, path, defaultVal) {
  if (obj === undefined) {
    return defaultVal
  }
  return get(obj[path[0]], path.slice(1))
}
function get(obj, path, defaultVal) {
  return path.reduce((obj, propName) => {
    return obj[propName]
  }, obj)
}


// matchesProperty('a.b')
function matchesProperty(path, value) {
  return function (obj) {
    return isEqual(get(obj, path), value)
  }
}

function property(path) {
  return function (obj) {
    return get(obj, path)
  }
  return bind(get, null, window, path)
}


function iteratee(value) {
  if (typeof value == 'string') {
    return property(value)
  }
  if (Array.isArray(value)) {
    return matchesProperty(value)
  }
  if (typeof value == 'object') {
    return matches(value)
  }
  return value
}






function curry(f) {

}

function add(a, b, c, d, e, f) {
  return a + b + c + d + e + f
}

add2 = curry(add)

function curry(f, length = f.length) {
  return function (...args) {
    if (args.length >= length) {
      return f(...args)
    } else {
      return curry(f.bind(null, ...args), length - args.length)
    }
  }
}

add2(1, 2, 3, 4)(5)(6)



function compose(funcs) {
  return function (...args) {
    var value = funcs[0](...args)
    for (var i = 1; i < funcs.length; i++) {
      value = funcs[i](value)
    }
    return value
  }
}
