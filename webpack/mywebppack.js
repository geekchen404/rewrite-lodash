let fs = require('fs')
let entry = 'main.js'

let modFuncCache = {}
function locaAll(path) {
  let code = fs.readFileSync(path)
  let modFunc = new Function('', code)
  modFuncCache[path] = modFunc
}