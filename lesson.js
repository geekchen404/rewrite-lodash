// 需要改
function after(m, func) {
  var times = 0;
  var lastRes = null;
  return function (...args) {
    times++;
    if (times < n) {
      return lastRes = f(...args)
    } else {
      return lastRes;
    }
  }
}

/**
 * 创建一个调用func的函数。调用func时最多接受 n个参数，忽略多出的参数
 * @param {*} func 
 * @param {*} n 被限制的参数的个数 
 */
function ary(func, n = func.length) {
  return function (...args) {
    return func(...args.slice(0, n));
  }
}


function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
TreeNode.prototype
Object.prototype == No1; No1.__proto__ == null
// 这个函数没有返回值，在调用的时候会直接返回这个函数包装的this的对象
// 若是有返回值，必须返回值是一个对象才会返回自定义的返回值，否则返回原始对象


function unary(func, n = func.length) {
  return ary(f, 1)
}

// 判断数组
function isArray(val) {
  return Object.prototype.toString.call(val) == '[object Array]'
}
// 判断数据类型的办法在js里面有三种, typeof,instanceof, prototyp  e.toString
['1', '2', '3', '4'].map(parseInt)
// 等同于：这里parseInt默认接两个参数
// parseInt('1', 0)=> 1
// parseInt('2', 1)=> NaN
// parseInt('3', 2)=> NaN
// parseInt('4', 3)=> NaN

// 应该写：
['1', '2', '3', '4'].map(val => parseInt(val))
// 或者
['1', '2', '3', '4'].map(unary(parseInt))


function spread(func) {
  return function (ary) {
    return func.apply(null, ary)
  }
}


function memoize(f) {
  let cache = {}
  return function (arg) {
    if (arg in map) {
      return cache[arg]
    } else {
      return cache[arg] = f(arg)
    }
  }
}

/**
 * 自动绑定函数，当函数接收的参数不够原函数的参数个数的时候，会返回一个函数，等待继续传值
 * 当参数个数足够的时候，会返回一个结果
 */
var abc = function (a, b, c) {
  return [a, b, c];
};

var curried = curry(abc);

curried(1)(2)(3);
// => [1, 2, 3]

curried(1, 2)(3);
// => [1, 2, 3]

curried(1, 2, 3);
// => [1, 2, 3]

// Curried with placeholders.
curried(1)(_, 3)(2);
// => [1, 2, 3]
function curry(f, n = 0) {
  if (!f) return undefined;
  n = f.length;
  let ary = arguments[2] || [];
  return function (...arg) {
    ary.push(...arg)
    if (ary.length < n) {
      return curry(f, n, ary);
    } else {
      return f(...ary.slice(0, n))
    }
  }
}

function filter() {

}

// 查看是否是自有属性
function forOwn(obj, interator) {
  var hasOwn = Object.prototype.hasOwnProperty;
  for (var key in obj) {
    if (hasOwn.call(obj, key)) {
      interator(obj[key], key, obj)
    }
  }
}

forOwn({ a: 1, b: 2 }, (val, key, obj) => {

})


blocks[0].map((_, idx) => {
  return blocks.map((cell => {
    return cell[idx];
  }).join('    |    ')
  ).join('\n')
})



function Vector(x, y) {
  this.x = x
  this.y = y;
}

Vector.prototype.plus = function (v) {
  let x = this.x + v.x
  let y = this.y + v.y
  return new Vector(x, y)
}

Object.defineProperty(Vector.prototype, 'length', {
  get: function () {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
})



function Complex(real, image) {
  this.real = real;
  this.image = image;
  this.res = real + image * i;
}


Complex.prototype = {
  plus(c) {
    let real = this.real + c.real;
    let image = this.image + c.image;
    return new Complex(real, image)
  }
}

Object.defineProperty(Complex.prototype, 'plus', function () {

})
var c1 = new Complex(2, 3)
var c2 = new Complex(2, -4)
c3 = c1.plus(c2)
c3 = c1.mul(c2)
c3 = c1.division(c2)
c3 = c1.toString(c2)
c1.toString()


function Stack() {
  this._top = null;
  this._elementCpunt = 0;
}

// 数组用链表表示，写出pop，push的方法
Stack.prototype = {
  pop() {
    if (this._top) {
      let node = this._top;
      this._top = this._top.next;
      this._elementCpunt--
      return node.val;
    } else {
      return undefined
    }
  },
  push() {
    let node = {
      val: val,
      next: this._top
    }
    this._top = node;
    this._elementCpunt++
    return this;
  },
  length() {
    return this._elementCpunt;
  }
}


function Queue() {
  this._head = null;
  this._end = null;
  this._count = 0;
};

Queue.prototype = {
  add(val) {
    if (this._end) {
      let node = {
        val: val,
        next: null
      }
      this._end.next = node;
      this._end = node;
      this._count++
      return this._end;
    } else {

    }
  },
  remove() {
    if (this._head) {
      this._head = this._head.next;
      this._count--;
      return this._head;
    }
  },
  get size() {
    return this._count
  }
}


class Queue {
  static from(ary) {
    var q = new Queue()
    for (var val of ary) {
      q.add(val)
    }
    return q
  }

  constructor(initVals) {
    this._head = null
    this._tail = null

    for (var val of initVals) {
      this.add(val)
    }
  }

  add(val) {
    var node = {
      val: val,
      next: null,
    }
    if (this._head == null) {
      this._head = this._tail = node
    } else {
      this._tail.next = node
      this._tail = node
    }
    return this
  }

  remove() {
    if (!this._head) {
      return undefined
    }
    var node = this._head
    this._head = this._head.next
    if (this._head == null) {
      this._tail = null
    }
    return node.val
  }

  get size() {
    return this._size
  }
}

/**
 * set是一个只有唯一值的数组
 * 注意5和'5'是不同的值
 */
class MySet {
  constructor(initialValues) {
    this.ary = [];
    this.count = 0;
    // 这里最好做一下数据类型的判断 
    initialValues.forEach((it) => this.add(it))
  }

  add(val) {
    let result = true;
    if (this.ary.length == 0) {
      this.ary.push(val)
      this.count++;
    } else {
      for (let i = 0; i < this.ary.length; i++) {
        val === this.ary[i] ? result = false : '';
      }
      if (result !== false) {
        this.ary.push(val)
        this.count++;
      }
    }
    return this.ary;
  }

  delete(val) {
    let n = this.ary.indexOf(val)
    n > -1 ? this.ary.splice(n, 1) : '';
    n > -1 ? this.count-- : '';
    return this.ary;
  }

  has(val) {
    return this.ary.indexOf(val) > -1
  }

  clear() {
    this.ary = []
    this.count = 0;
  }

  get size() {
    return this.count;
  }
}

/**
 * 过滤数组中的重复值
 */
function add(ary) {
  let res = [ary[0]]
  ary.map((it) => {
    let result = true;
    for (let i = 0; i < res.length; i++) {
      if (it === res[i]) {
        result = false;
      }
    }
    if (result !== false) {
      res.push(it)
    }
  })
  return res;
}


/**
 * 键值对，也是唯一值，并且有覆盖属性
 */
class MyMap {
  constructor(initialMaps) {
    this.aryKey = [];
    this.aryVal = [];
    this.count = 0;
    for (let key in initialMaps) {
      this.set(key, initialMaps[key])
    }
  }

  set(key, val) {
    let n = this.aryKey.indexOf(key)
    if (n < 0) {
      // 这里是增加一个键值对
      this.aryKey.push(key)
      this.aryVal.push(val)
      this.count++
    } else {
      // 这里是重新赋值，不改变数组结构 
      this.aryVal[n] = val;
    }
    return this;
  }

  get(key) {
    let n = this.aryKey.indexOf(key)
    if (n > -1) {
      return this.aryVal[n]
    }
    return undefined;
  }

  delete(key) {
    let n = this.aryKey.indexOf(key)
    if (n > -1) {
      this.aryKey.splice(n, 1)
      this.aryVal.splice(n, 1)
      this.count--;
      return true;
    }
    return false;
  }

  has(key) {
    let n = this.aryKey.indexOf(key)
    return n < 0 ? false : true;
  }

  clear() {
    this.aryVal = []
    this.aryKey = []
  }

  get size() {
    return this.count;
  }
}


abc = new Mymap()

