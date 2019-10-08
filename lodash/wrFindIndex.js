/**
 * 找到第一个比较为true的数据的下标
 * @param {*} array 
 * @param {*} predicate 
 * @param {*} fromIndex 
 */
function findIndex(array, predicate = null, fromIndex = 0) {
  if (predicate == null) return 0;
  let res = -1;
  let type = getType(predicate)
  for (let i = fromIndex; i < array.length; i++) {
    let val = array[i]
    let cur = false;
    switch (type) {
      case 'function':
        cur = predicate(val)
        break;
      case 'string':
        return findIndex(array, property(predicate), fromIndex)
      case 'array':
        return findIndex(array, matchesProperty(predicate[0], predicate[1]), fromIndex)
      case 'object':
        return findIndex(array, matches(predicate), fromIndex)
      default:
        break;
    }
    if (cur) {
      res = i;
      break;
    }
  }
  return res;
}



/**
 * 对比val和obj是否相同，返回一个函数
 * @param {*} obj 
 * @returns {Function}
 */
function matches(obj) {
  return function (val) {
    let res = true;
    for (let v in obj) {
      if (obj[v] !== val[v]) {
        res = false;
        break;
      }
    }
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



