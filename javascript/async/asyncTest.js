/**
 * 用异步实现一个map遍历函数
 * @param {*} ary 
 * @param {*} asyncMapper 
 * @param {*} callback 
 */
function asyncMap(ary, asyncMapper, callback) {
  let result = []
  let count = 0;
  for (let i = 0; i < ary.length; i++) {
    asyncMapper(ary[i], (res) => {
      count++
      result[i] = res;
      //result.push(res)
      //这里本来可以这样写，但是在异步的使用中是不行的
      //因为你不确定这个回调函数的执行时间(在真正的接口请求中)
      if (count === ary.length) {
        callback(res)
      }
    })
  }
}


/**
 * asyncMap用法：
 * asnycMap([1,2,3,4],function(val,callback){
 *        callback(val*val)
 * },function(result){
 *        consloe.log(result)
 * })
 *
 */


/**
 * 异步的方式实现fillter
 * 这种异步的写法，第一个参数是数组，第二个参数是执行函数，第三个参数是回调函数，即为最后得出的结果
 * 回调函数是在第二个参数里面调用的，即为当检测到执行完成的时候调用回调函数
 * 
 */
function fillterAsync(ary, fillter, callback) {
  let count = 0
  let newAry = []
  for (let i = 0; i < ary.length; i++) {
    fillter(ary[i], (res) => {
      if (res) {
        newAry.push(ary[i])
      }
      count++
      if (count == ary.length) {
        callback(newAry)
      }
    })
  }
}
// 用法
fillterAsync([1, 2, 3, 4, 5], (val, cb) => {
  if (val % 2 == 0) {
    cb(true)
  } else {
    cb(false)
  }
}, (res) => {
  console.log(res)
})




/**
 * 实现异步every
 */
function asyncEvery(ary, every, callback) {
  let count = 0;
  let res = true
  for (let i = 0; i < ary.length; i++) {
    while (res) {
      every(ary[i], (res) => {
        count++
        if (!res || count == ary.length) {
          callback(res)
          res = false
        }
      })
    }
  }
}



Promise.resolve = function (val) {
  return new Promise((res, rej) => {
    res(val)
  })
}

Promise.reject = function (val) {
  return new Promise((res, rej) => {
    rej(val)
  })
}
/**
 * onRejected是传入的reject函数
 */
Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

Promise.all = function (ary) {
  let newAry = []
  let count = 0;
  return new Promise((res, rej) => {
    for (let i = 0; i < ary.length; i++) {
      count++
      // 这里加这个 Promise.resolve(val[i])是为了确定then的使用不会报错，
      // 万一数组里面的值val[i]不是一个promise，那么直接val[i].then就会报错
      // 用 Promise.resolve()包起来就是为了将这个变成一个promise
      Promise.resolve(val[i]).then(val => {
        newAry[i] = val
        if (count == ary.length) {
          res(newAry)
        }
      }, reason => {
        rej(reason)
      })
    }
    return newAry;
  })
}


// race就是比赛的意思，表示这个race表示的是第一个有返回值的promise，
// 先返回完成就是完成，先返回错误就是错误，
// 写这个函数需要理解，状态一旦确定就无法改变
Promise.race = function (values) {
  return new Promise((resolve, reject) => {
    values.forEach(val => {
      val.then(res => {
        resolve(res)
      }, rej => {
        reject(rej)
      })
    });
  })
}
// 化简，简化有点不太懂
Promise.race = function (values) {
  return new Promise((resolve, reject) => {
    values.forEach(val => {
      Promise.resolve(val).then(resolve, reject)
    });
  })
}
