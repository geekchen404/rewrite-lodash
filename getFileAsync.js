// 该文件用于异步获取某个路径下的所有文件并提取出完整路径
const fsp = require('fs').promises

const path = 'javascript'

/**
 * async await 版本
 */
async function listAllFilesAsync(dirPath) {
  let isFiles = await fsp.stat(dirPath)
  let files = []
  if (isFiles.isFile()) {
    return [dirPath]
  } else {
    let file = await fsp.readdir(dirPath)
    for (let fileName of file) {
      let curres = await listAllFilesAsync(dirPath + '/' + fileName)
      files.push(...curres)
    }
    return files;
  }
}
listAllFilesAsync(path).then(console.log)

