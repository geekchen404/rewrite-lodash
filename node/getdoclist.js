const fs = require('fs')
const fsp = fs.promises


function listAllFileSync(path) {
  let result = []
  let stat = fs.statSync(path)
  if (stat.isFile()) {
    return [path]
  } else {
    let names = fs.readdir(path)
    names.forEach(name => {
      let fullPath = path + '/' + name
      let stats = fs.statSync(fullPath)
    })
  }
}