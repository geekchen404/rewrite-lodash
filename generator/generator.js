

function* fibb(n) {
  let a = 0;
  let b = 1;
  while (n--) {
    yield a;
    b = a + b;
    a = b - a;
  }
}
// for of 的用法还能接受一个构造器、
for (let val of fibb(10)) {
  console.log(val)
}
// 该函数的返回值有一个next的属性
f10 = fibb(10)//此时该函数没有运行
f10.next()//此时才会执行fibb函数，并且遇到yield的时候暂停，
// 返回一个对象，对象的value是yeild后面的值，还有一个done属性，表示该函数是否执行完成：done：false
// 当函数运行完之后，才会把value的值变成return的值，done为true
//当暂停的时候，会暂停在yeild的

function getgen() {
  return function* gen() {
    console.log('a')
    let a = yield 1;
    console.log('b')
    let b = yield 2;
    console.log('c')
    yield 3;
    let c = console.log('d')
    return `a:${a},b:${b},c:${c}`
  }
}

[...gen()]//只拿gen里面的所有yeild的所有数据
generator = getgen()//调用得到生成器
generator.next(123)
generator.next(456)
generator.next(789)
generator.next(0)
generator.return()//让该生成器直接结束，并且返回构造器的对象，value是return的参数，done为true


function* gen() {
  console.log('a')
  try {
    let a = yield 1;
  } catch (e) {
    console.log(e)
  }
  console.log('b')
  let b = yield 2;
  console.log('c')
  yield 3;
  let c = console.log('d')
  return `a:${a},b:${b},c:${c}`
}
generator.throw(999)// 

// 实现函数，输出0-10
Number.prototype[Symbol.iterator] = function* () {
  for (let i = 0; i <= this; i++) {
    yield i;
  }
}
for (let i of 10) {
  console.log(i)
}
// 执行查看结果





function nature(n) {
  return [...naturer(n)]
}
function* naturer(n) {
  for (let i = 0; i < n; i++) {
    yield i;
  }
}


/**
 * 输出小于n的所有素数
 * @param {Number} n 
 */
function* primes(n) {
  let c = 0;
  for (var i = 2; ; i++) {
    if (isPrimes(i)) {
      c++
      yield i;
    }
  }
}
function isPrimes(n) {
  for (let i = 2; i <= n; i++) {
    if (n % 1 == 0) {
      return false
    }
  }
  return true;
}
