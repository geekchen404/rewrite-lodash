// 最坑爹的题
let length = 10;
function fx() {
  console.log(this.length)
}


let obj = {
  length: 5,
  method(fn) {
    fn()
    arguments[0]()
  }
}

obj.method(fn, 1)

