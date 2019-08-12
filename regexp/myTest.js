


/**
 * test函数
 */
RegExp.prototype.myTest = function (str) {
  return this.exec(str) !== null;
}

/**
 * match函数
 */
String.prototype.myMatch = function (expr) {
  // 带g和不带g
  if (expr.global) {
    let res = []
    let cur = ''
    while (cur = expr.exec(this)) {
      res.push(cur[0])
    }
    return res;
  } else {
    return expr.exec(this)
  }
}

/**
 * 返回找到第一个匹配到的位置的下标
 */
String.prototype.mySearch = function (expr) {
  let res = expr.exec(this)
  return res == null ? -1 : res.index;
}


/**
 * @test 'foobarbazfocsbcdeefosee'.split(/fo./)
 * @returns ["", "barbaz", "sbcdee", "ee"]
 */
String.prototype.mySplit = function (expr) {
  if (!expr.global) {
    expr = new RegExp(expr, expr.flags + 'g')
  }
  let res = []
  let cur = ''
  let idx = 0
  while (cur = expr.exec(this)) {
    let str = this.slice(idx, cur.index)
    res.push(str, ...cur.slice(1))
    idx = expr.lastIndex;
  }
  res.push(this.slice(idx))
  return res;
}


/**
 * 存在括号的时候的替换，并且替换成$1,$2等等
 */
String.prototype.myReplace = function (expr, f) {
  if (!expr.global) {
    expr = new RegExp(expr, expr.flags + 'g')
  }
}

