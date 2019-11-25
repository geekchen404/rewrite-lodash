
// promise本身就是对异步函数的封装，通过对回调函数的注册来实现异步的链式调用
// 自己的感觉就是，异步的回调函数和内层的嵌套变成了同步的写法
// state: 1:pending，2：resovle，3：reject
// 这个写法一定有错，等我以后有时间慢慢弄
class WrPromise {
  // 这里接受new的时候传入一个函数，(res,rej)=>{}
  constructor(exec) {
    this.state = 1;//promise当前的状态
    this.data = undefined;//promise的最终值
    this.onSuccessCallback = []//promise所有的成功回调函数集合
    this.onRejectCallback = []//promise所有失败的回调函数
    try {
      const resolve = this.resolve.bind(this)
      const reject = this.reject.bind(this)
      exec(resolve, reject)//同步调用
    } catch (error) {
      this.reject(error)//抛错的话返回一个错误promise
    }
  }

  resovle(val) {
    //如果还没有确定结果
    if (this.state == 1) {
      this.state = 2
      this.value = val
      this.onSuccessCallback.forEach(cb => setTimeout(() => cb(this.value), 0))
    }
  }

  reject(reason) {
    //如果还没有确定结果
    if (this.state == 1) {
      this.state = 3
      this.value = reason
      this.onRejectCallback.forEach(cb => setTimeout(() => cb(this.value), 0))
    }
  }


  //这里接受两个函数，一个成功的时候调用的函数，一个失败的时候调用的函数
  // 这个函数返回一个promise，确定结果
  // 两个参数都是可选，必须是函数，而且这两个函数必须被异步调用，所以应该是setTimeout(()=>{},0)
  then(resolvedHandler, rejectedHandler) {
    //  这句话是如果这两个不是函数就变为一个把接受的参数直接返回的函数
    typeof resolvedHandler === 'function' || (resolvedHandler = v => v)
    typeof rejectedHandler === 'function' || (rejectedHandler = v => v)
    return new WrPromise((resovle, reject) => {
      //如果是pending状态，还没有结果的话就先把传入的回调函数放进回调的队列里面
      let onResolved = () => {
        let resolved = resolvedHandler(this.value)
        try {
          resolved instanceof WrPromise ? resolved.then(resovle, reject) : resovle(resolved)
        } catch (error) {
          reject(error)
        }
      }
      let onRejected = () => {
        try {
          let rejected = rejectedHandler(this.value)
          rejected instanceof WrPromise ? rejected.then(resovle, reject) : reject(rejected)
        } catch (error) {
          reject(error)
        }
      }
      if (this.state === 1) {
        this.onSuccessCallback.push(onResolved)
        this.onRejectCallback.push(onRejected)
      }
      //如果是成功状态
      if (this.state === 2) {
        onResolved()
      }
      // 如果是失败状态
      if (this.state === 3) {
        onRejected()
      }
    })

  }


  catch(onRejected) {
    return this.then(null, onRejected)
  }

  finally(onFinally) {
    return this.then(onFinally, onFinally)
  }


  all(promises) {
    return new WrPromise((resovle, reject) => {
      let result = []
      let length = 0
      for (let i = 0; i < promises.length; i++) {
        //对数组进行遍历，执行每个异步的then操作进行操作
        //如何异步操作全部成功执行，并且都成功了，就返回成功的结果
        // 如果异步操作有一个失败了，就直接得到失败的结果
        WrPromise.resolve(promises[i]).then(val => {
          // 需要用Promise.resolve把可能为不是promise的数据转变为promise后调用then方法
          // 这样才不会出错
          result[i] = val
          length++
          //这里需要继续回调的次数，是否全部都成功了
          if (length == promises.length) {
            //如果全部都成功了，就执行resovle
            resovle(result)
          }
        }, reason => {
          reject(reason)
          i = promises.length//直接退出循环，因为得到错误的结果
        })
      }
    })
    // 所以这之后就得到了一个成功或者失败的promise状态
  }

  //得到一个数组，返回最先得到结果的结果
  race(promises) {
    return new WrPromise((resovle, reject) => {
      for (let i = 0; i < promises.length; i++) {
        WrPromise.resolve(promises[i]).then(resovle, reject)
      }
    })
  }

}


/**
 * 封装ajax的异步请求，promise版本
 * @param {*} url 
 */
function get(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open('get', url.false)//false表示不异步，等待结果后才继续
    xhr.send()
    xhr.onload = function () {
      resolve(xhr.responseText)
    }
    xhr.onerror = function (e) {
      reject(e)
    }
  })
}


/**
 * test
 */
const p1 = new WrPromise((resolve, reject) => {
  setTimeout(() => {
    console.log(`p1`);
    resolve(`p1`)
  }, 1000);
})
const p2 = new WrPromise((resolve, reject) => {
  setTimeout(() => {
    console.log(`p2`);
    reject('p2')
    // resolve(`p2`)
  }, 3000);
})
const p3 = new WrPromise((resolve, reject) => {
  setTimeout(() => {
    console.log(`p3`);
    resolve(`p3`)
  }, 2000);
})

WrPromise.all([p1, 'foo', p2, p3])
  .then(r => console.log(`all done`, r))
  .catch(console.log)

WrPromise.race([p1, p2, p3])
  .then(console.log, console.log)



new WrPromise((resolve, reject) => {
  console.log(`hi`);
  setTimeout(() => {
    resolve(1)
    reject(222)
  }, 1000);
})
  .then()
  .catch(console.log)
  .finally(r => {
    console.log('finally');
    console.log(r);
  })

//别人的A+版本
var Promise = (function () {
  function Promise(resolver) {
    if (typeof resolver !== 'function') {
      throw new TypeError('Promise resolver ' + resolver + ' is not a function')
    }
    if (!(this instanceof Promise)) return new Promise(resolver)

    var self = this
    self.callbacks = []
    self.status = 'pending'

    function resolve(value) {
      setTimeout(function () {
        if (self.status !== 'pending') {
          return
        }
        self.status = 'resolved'
        self.data = value

        for (var i = 0; i < self.callbacks.length; i++) {
          self.callbacks[i].onResolved(value)
        }
      })
    }

    function reject(reason) {
      setTimeout(function () {
        if (self.status !== 'pending') {
          return
        }
        self.status = 'rejected'
        self.data = reason

        for (var i = 0; i < self.callbacks.length; i++) {
          self.callbacks[i].onRejected(reason)
        }
      })
    }

    try {
      resolver(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  function resolvePromise(promise, x, resolve, reject) {
    var then
    var thenCalledOrThrow = false

    if (promise === x) {
      return reject(new TypeError('Chaining cycle detected for promise!'))
    }

    if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
      try {
        then = x.then
        if (typeof then === 'function') {
          then.call(x, function rs(y) {
            if (thenCalledOrThrow) return
            thenCalledOrThrow = true
            return resolvePromise(promise, y, resolve, reject)
          }, function rj(r) {
            if (thenCalledOrThrow) return
            thenCalledOrThrow = true
            return reject(r)
          })
        } else {
          return resolve(x)
        }
      } catch (e) {
        if (thenCalledOrThrow) return
        thenCalledOrThrow = true
        return reject(e)
      }
    } else {
      return resolve(x)
    }
  }

  Promise.prototype.then = function (onResolved, onRejected) {
    onResolved = typeof onResolved === 'function' ? onResolved : function (v) { return v }
    onRejected = typeof onRejected === 'function' ? onRejected : function (r) { throw r }
    var self = this
    var promise2

    if (self.status === 'resolved') {
      return promise2 = new Promise(function (resolve, reject) {
        setTimeout(function () {
          try {
            var x = onResolved(self.data)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            return reject(e)
          }
        })
      })
    }

    if (self.status === 'rejected') {
      return promise2 = new Promise(function (resolve, reject) {
        setTimeout(function () {
          try {
            var x = onRejected(self.data)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            return reject(e)
          }
        })
      })
    }

    if (self.status === 'pending') {
      return promise2 = new Promise(function (resolve, reject) {
        self.callbacks.push({
          onResolved: function (value) {
            try {
              var x = onResolved(value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              return reject(e)
            }
          },
          onRejected: function (reason) {
            try {
              var x = onRejected(reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              return reject(e)
            }
          }
        })
      })
    }
  }

  Promise.prototype.valueOf = function () {
    return this.data
  }

  Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
  }

  Promise.prototype.finally = function (fn) {
    // 为什么这里可以呢，因为所有的then调用是一起的，但是这个then里调用fn又异步了一次，所以它总是最后调用的。
    // 当然这里只能保证在已添加的函数里是最后一次，不过这也是必然。
    // 不过看起来比其它的实现要简单以及容易理解的多。
    // 貌似对finally的行为没有一个公认的定义，所以这个实现目前是跟Q保持一致，会返回一个新的Promise而不是原来那个。
    return this.then(function (v) {
      setTimeout(fn)
      return v
    }, function (r) {
      setTimeout(fn)
      throw r
    })
  }

  Promise.prototype.spread = function (fn, onRejected) {
    return this.then(function (values) {
      return fn.apply(null, values)
    }, onRejected)
  }

  Promise.prototype.inject = function (fn, onRejected) {
    return this.then(function (v) {
      return fn.apply(null, fn.toString().match(/\((.*?)\)/)[1].split(',').map(function (key) {
        return v[key];
      }))
    }, onRejected)
  }

  Promise.prototype.delay = function (duration) {
    return this.then(function (value) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve(value)
        }, duration)
      })
    }, function (reason) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          reject(reason)
        }, duration)
      })
    })
  }

  Promise.all = function (promises) {
    return new Promise(function (resolve, reject) {
      var resolvedCounter = 0
      var promiseNum = promises.length
      var resolvedValues = new Array(promiseNum)
      for (var i = 0; i < promiseNum; i++) {
        (function (i) {
          Promise.resolve(promises[i]).then(function (value) {
            resolvedCounter++
            resolvedValues[i] = value
            if (resolvedCounter == promiseNum) {
              return resolve(resolvedValues)
            }
          }, function (reason) {
            return reject(reason)
          })
        })(i)
      }
    })
  }

  Promise.race = function (promises) {
    return new Promise(function (resolve, reject) {
      for (var i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i]).then(function (value) {
          return resolve(value)
        }, function (reason) {
          return reject(reason)
        })
      }
    })
  }

  Promise.resolve = function (value) {
    var promise = new Promise(function (resolve, reject) {
      resolvePromise(promise, value, resolve, reject)
    })
    return promise
  }

  Promise.reject = function (reason) {
    return new Promise(function (resolve, reject) {
      reject(reason)
    })
  }

  Promise.fcall = function (fn) {
    // 虽然fn可以接收到上一层then里传来的参数，
    // 但是其实是undefined，所以跟没有是一样的，因为resolve没参数啊
    return Promise.resolve().then(fn)
  }

  Promise.done = Promise.stop = function () {
    return new Promise(function () { })
  }

  Promise.deferred = Promise.defer = function () {
    var dfd = {}
    dfd.promise = new Promise(function (resolve, reject) {
      dfd.resolve = resolve
      dfd.reject = reject
    })
    return dfd
  }

  try { // CommonJS compliance
    module.exports = Promise
  } catch (e) { }

  return Promise
})()
