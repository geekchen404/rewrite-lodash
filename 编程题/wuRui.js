/**
 * 来自吴蕊的反馈，1107早上十点面试者
 * 因为昨天连着三场面试，想当天晚上给你发，但是实在是没有力气码字了
 */

/**
 * 简单的实现add(2,5)=>7,add(2)(5)=>7
 * 不会考虑其他情况的
 * @param  {...any} args 
 * @test add(2,5) / add(2)(5)
 */
function add(...args) {
  return args[1] ? args[0] + args[1] : val => args[0] + val
}

/**
 * 昨天想说的是这个，其实valueOf和toString都ok
 * @param  {...any} args 
 * @test add(2)(5)(8)(9)(1, 2)==27 / add(1, 2, 3, 4, 5)==15 / add(1, 2, 3, 4, 5)+0
 */
function add(...args) {
  let f = add.bind(null, ...args)
  f.valueOf = function () {
    return args.reduce((a, b) => a + b)
  }
  return f
}

/**
 * 这个是你出的题的延伸，需要确定add的参数的个数，参数满了才会得到结果
 * @param {*} f 
 * @param {*} length 
 */
function curry(f, length = f.length) {
  return function (...args) {
    if (args.length >= length) {
      return f(...args)
    } else {
      return curry(f.bind(null, ...args), length - args.length)
    }
  }
}

function add(a, b, c, d, e) {
  return Array.from(arguments).reduce((a, b) => a + b)
}

var f = curry(add)
console.log(f(1)(1, 2, 3)(1))
var f1 = f(1, 2, 3)
var f2 = f1(2, 3)
console.log(f2)

/**
 * 这种参数不能确定，但是可以不停调用，每次都返回值的情况我目前没有想到好的解决办法
 * 比如： add(2)(5)(8)(9)(1, 2) / add(1, 2, 3, 4, 5)
 */



/**
 * 这里讨论的异步任务的串行和并行执行
 * 我认为，如果不知道情况的异步任务，我是无法得到这个异步任务的代码执行到哪一步的
 * 除非是异步任务接受回调函数的情况，后面也有promise的情况
 */
var ary = []
//串行执行的情况，相当于每次都返回一个promise，每次都是resolve之后才执行，手动的调用每一个then
ary.reduce((cur, it) => {
  return cur.then(() => it())
}, Promise.resolve()).then(() => { console.log('执行完成') })

Promise.all(ary).then(() => { console.log('执行完成') })





function getResult(val, time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(val)
      resolve()
    }, time)
  })
}
(async () => {
  const a = getResult(1, 3000) //1
  const b = getResult(2, 2000) //2

  await a
  await b
})();

(async () => {
  await getResult(3, 3000) //3
  await getResult(4, 2000) //4
})();

/**
 * 上面的执行顺序是2134
 * 当代码走到1处 => 会注册3秒之后打印1，
 * 注册之后代码走到2处 => 会注册2秒之后打印2
 * 然后await a,代码会等到a结束再继续，所以第一个async直接到这里停止
 * 接着走下面的第二个函数async
 * 又遇到一个await 3 => 注册3秒之后打印3，函数又停止在当前位置等待
 * 此时主线程已经空了
 * 两秒之后，打印2
 * 隔1秒钟打印1
 * 马上打印3
 * 再走到第二个async函数的下一行，await 4，注册两秒之后打印4
 * 两秒之后打印4，结束
 * 执行完代码等待两秒=>2 ,等待1秒=>1，马上=>3,再等两秒=>4
 * 2=>1=>3=>4
 */
