
// 非常重要的函数，是通过promise方式读取某个路径下的所有文件
// 自己需要再写一遍

const fsp = require('fs').promises

const path = 'javascript'

function listAllFilesPromise(dirPath) {
  return fsp.stat(dirPath).then(res => {
    if (res.isFile()) {
      return [dirPath]
    } else {
      return fsp.readdir(dirPath).then(files => {
        // 为什么promiseall之后还要then
        // 因为每进来一次就是一个数组，最后返回的可能是多个数组，需要解构后返回
        return Promise.all(files.map(fileName => listAllFilesPromise(dirPath + '/' + fileName)))
          .then(arrays => [].concat(...arrays))
      })
    }
  })
}

listAllFilesPromise(path).then(console.log)