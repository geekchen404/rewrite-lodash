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

