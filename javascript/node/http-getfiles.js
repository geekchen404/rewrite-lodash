const fs = require('fs')

/**
 * 第一个参数是文件路径
 * 第二个参数是得到的文件的编码，不传默认buffer内存片段，
 * 第三个参数是异步回调的结果
 */
fs.readFile('aa.txt', 'utf-8', (err, res) => {

})


function readFilePromise(...args) {
  return new Promise((res, rec) => {
    fs.readFile(...args, (err, data) => {
      if (err) {
        rec(err)
      } else {
        res(data)
      }
    })
  })
}
readFilePromise('a.js').then(data => {

}).catch(err => {

})

function writeFilePromise(...args) {
  return new Promise((res, rec) => {
    fs.writeFile(...args, (err) => {
      if (err) {
        rec(err)
      } else {
        res()
      }
    })
  })
}

/**
 * 将一个基于回调的函数变为基于promise的函数
 * @param {*} path 路径
 */
function promisify(f) {
  return function (...args) {
    return new Promise((res, rec) => {
      f(...args, (err, data) => {
        if (err) {
          rec(err)
        } else {
          res(data)
        }
      })
    })
  }
}

// 使用
readFilePromise = promisify(fs.readFile)


/**
 * promise转为callback
 */
function callabckfy(promiseed) {
  return function (...args) {
    // 得到传进来的最后的回调函数
    let cb = args.pop()
    promiseed(...args).then(val => {
      cb(null, val)
    }, reason => {
      cb(reason)
    })
  }
}

// promisify,callabckfy这两个函数在util里面有
