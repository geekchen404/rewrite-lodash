/**
 * ! 注意值穿透
 * ! 注意链式调用
 * ! 注意 then 都是异步任务, 准确说是微任务(这里只以 steTimeout 的方式实现), 
 * 和其他 promise 的交互暂时不考虑了
 */

class MyPromise {
  constructor(exec) {
    this.state = 'pending'
    this.value = null
    this.resolvedCallbacks = []
    this.rejectedCallbacks = []

    try {
      const resolve = this.resolve.bind(this)
      const reject = this.reject.bind(this)
      exec(resolve, reject)
    } catch (error) {
      this.reject(error)
    }
  }

  resolve(val) {
    if (this.state !== 'pending') return;
    this.state = 'resolve'
    this.value = val
    this.resolvedCallbacks.forEach(cb => setTimeout(() => cb(this.value), 0))
  }

  reject(val) {
    if (this.state !== 'pending') return;
    this.state = 'reject'
    this.value = val
    this.rejectedCallbacks.forEach(cb => setTimeout(() => cb(this.value), 0))
  }

  then(resolvedHandler, rejectedHandler) {
    //  这句话是如果这两个不是函数就变为一个把接受的参数直接返回的函数
    typeof resolvedHandler === 'function' || (resolvedHandler = v => v)
    typeof rejectedHandler === 'function' || (rejectedHandler = v => v)

    // then 时 如果 前一个 promise 还没有结果, 则返回一个新的 promise,         
    if (this.state === 'pending') {
      return new MyPromise((resolve, reject) => {
        this.resolvedCallbacks.push(() => {
          try {
            const x = resolvedHandler(this.value)
            x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
          } catch (error) {
            reject(error)
          }
        })
        this.rejectedCallbacks.push(() => {
          try {
            const x = rejectedHandler(this.value)
            x instanceof MyPromise ? x.then(resolve, reject) : reject(x)
          } catch (error) {
            reject(error)
          }
        })
      })
    }

    if (this.state === 'resolve') {
      return new MyPromise((resolve, reject) => {
        try {
          const x = resolvedHandler(this.value)
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
        } catch (error) {
          reject(error)
        }
      })
    }

    if (this.state === 'reject') {
      return new MyPromise((resolve, reject) => {
        try {
          const x = rejectedHandler(this.value)
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
        } catch (error) {
          reject(error)
        }
      })
    }

  }

  catch(rejectedHandler) {
    return this.then(undefined, rejectedHandler)
  }

  finally(finallyHandler) {
    return this.then(finallyHandler, finallyHandler)
  }
}

MyPromise.all = (arr) => {
  const max = arr.length
  let count = 0
  let values = new Array(max)
  return new MyPromise((resolve, reject) => {
    arr.forEach((p, idx) => {
      try {
        if (Object.getPrototypeOf(p) === MyPromise.prototype) {
          p.then(r => {
            values[idx] = r
            if (++count === max) resolve(values)
          }, e => {
            console.log('eee:', e);
            reject(e)
          })
        } else {
          if (typeof p === 'function') {
            values[idx] = p()
          } else {
            values[idx] = p
          }
          if (++count === max) resolve(values)
        }
      } catch (error) {
        reject(error)
      }
    })
  })
}

MyPromise.race = (arr) => {
  return new MyPromise((resolve, reject) => {
    try {
      arr.forEach(p => {
        p instanceof MyPromise && p.then(resolve, reject)
        // typeof p === 'function' && resolve(p())
        // resolve(p)
      })
    } catch (error) {
      reject(error)
    }
  })
}

const p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    console.log(`p1`);
    resolve(`p1`)
  }, 1000);
})
const p2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    console.log(`p2`);
    reject('p2')
    // resolve(`p2`)
  }, 3000);
})
const p3 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    console.log(`p3`);
    resolve(`p3`)
  }, 2000);
})

MyPromise.all([p1, 'foo', p2, p3])
  .then(r => console.log(`all done`, r))
  .catch(console.log)

MyPromise.race([p1, p2, p3])
  .then(console.log, console.log)



new MyPromise((resolve, reject) => {
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