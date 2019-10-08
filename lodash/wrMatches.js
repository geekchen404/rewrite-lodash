

/**
 * 对比val和obj是否相同或者val是否是obj的子集，返回一个函数
 * @param {*} obj 
 * @returns {Function}
 */
function matches(obj) {
  return function (val) {
    let res = hes(obj, val);
    // for (let v in obj) {
    //   if (obj[v] !== val[v]) {
    //     res = false;
    //     break;
    //   }
    // }
    return res;
  }
}

/**
 * 当对比的数据中出现键值对的时候
 * 需要对比数据是否符合key，val
 * 返回true，false
 * @param {} key 
 * @param {*} val 
 * @param {*} data 
 */
function matchesProperty(key, val) {
  return function (data) {
    return data[key] == val
  }
}


/**
 * 判断给定的字符串中的每一个属性对应到val数据中，是否为true
 * 返回true，false
 * @param {String} str 
 * @param {Object} val 
 */
function property(str) {
  return function (val) {
    if (typeof str == 'string') {
      str = str.split('.');
    }
    for (let i of str) {
      val = val[i]
    }
    return !(val === false || val == undefined);
  }
}



function getType(val) {
  let type = typeof val;
  if (val instanceof Array) type = 'array';
  return type;
}




function isMatch() {
  // 是否相等
  // 是对象就深度调用
  // 是数组简单调用
}

function matches() {
  // return bind(isMatch, null, _, src)
  return function (obj) {
    return isMatch(obj, src)
  }
}

var matches = src => bind(isMatch, null, window, src)


function bind(f, thisArg, ...fixedArgs) {//1,windoww,2,3
  return function (...args) {//4,5
    var act = [...fixedArgs]
    for (var i = 0; i < act.length; i++) {
      if (act[i] == window) {
        act[i] = args.shift()
      }
    }
    act.push(...args)
    return f.apply(thisArg, act)
  }
}


function matchesProperty(path, val) {
  return function (obj) {
    return isEqual(get(obj, path), val)
  }
}


function get(obj, path, defaultval) {
  var path = toPath(ptah)
  for (let i = 0; i < path.length; i++) {
    if (obj == undefined) return defaultval;
    obj = obj[path[i]]
  }
  return obj;
}

function get(obj, path, defaultval) {
  return path.reduce((obj, propname) => {
    if (obj == undefined) {
      return defaultval
    }
    return obj[propname]
  }, obj)
}



function property(path) {

  return function (obj) {
    return get(obj, path)
  }
  // return bind(get,null,window,path)
}

/**
 * 
 * @param {*} str
 * a.b.0.c[foo][bar].d 
 */
function toPath(str) {
  return str.split(/\.|\[|\]./g)
}


function dropRightWhile(array, predicate = null) {

}


function iteratee() {

}



/**
 * 柯里化
 * @param {*} f 
 */
function curry(f, length = f.length) {
  return function (...args) {
    if (args.length == length) {
      return f(...args)
    } else {
      return curry(f.bind(null, ...args), length - args.length)
    }
  }
}

function add(a, b, c, d, e, f) {
  return a + b + c + d + f;
}

/**
 * 类似于多次调用map的时候为了减少多次遍历
 * 将多次调用的表达式合成为一个
 * @param {*} funs 
 */
function compose(funs) {
  return function (...args) {
    let value = funs[0](...args)
    for (let i = 0; i < funs.length; i++) {
      value = funs[i](value)
    }
  }
}


sortBy
reverse
map
join
countBy
