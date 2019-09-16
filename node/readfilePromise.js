let fs = require('fs')
function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

readFilePromise('a.js').then(data => {

}).catch(err => {

})



function run(generatorFunction) {
  return new Promise((resolve, reject) => {
    var iter = generatorFunction()
    var generated
    try {
      generated = iter.next()
    } catch (e) {
      reject(e)
    }
    step()
    function step() {
      if (!generated.done) {
        generated.value.then(val => {
          try {
            generated = iter.next(val)
          } catch (e) {
            reject(e)
          }
          step()
        }, reason => {
          try {
            generated = iter.throw(reason)
          } catch (e) {
            reject(e)
          }
          step()
        })
      } else {
        Promise.resolve(generated.value).then(resolve, reject)
      }
    }
  })
}
