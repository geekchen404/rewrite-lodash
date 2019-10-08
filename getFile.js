// 该文件用于异步获取某个路径下的所有文件并提取出完整路径
const fs = require('fs')

const path = 'javascript'

/**
 * 接收一个文件夹路径，返回这个文件夹里面的所有文件名
 * 需要递归的得到所有的文件名 并放在一个一维数组里返回
 * 需要写三个版本：
 * 同步版
 * 回调版
 * Promise版本
 */
function listAllFilesSync(dirPath) {
  let isFiles = fs.statSync(dirPath).isFile()
  let files = []
  // 如果是文件，为true，是文件夹为false
  if (isFiles) {
    // 该路径为文件
    return [dirPath]
  } else {
    // 是一个文件夹，需要递归读取下面的每一个文件
    fs.readdirSync(dirPath).forEach(fileName => {
      let curres = listAllFilesSync(dirPath + '/' + fileName)
      files.push(...curres)
    });
    return files;
  }
}
const res = listAllFilesSync(path)
console.log('异步读取文件的数据为：', res)

