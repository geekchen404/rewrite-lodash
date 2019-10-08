const fs = require('fs')

const path = 'javascript'

function listAllFilesCallback(dirPath, callback) {
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
  callback(listAllFilesSync(dirPath))
}


listAllFilesCallback(path, (err, files) => {
  console.log(files)
})