function p1(cb) {
  setTimeout(cb, Math.random() * 1000)
}
function p2(cb) {
  setTimeout(cb, Math.random() * 2000)
}
function p3() {
  console.log('done')
}

function test() {
  let cnt = 0;
  function cb() {
    cnt++
    if (cnt == 2) p3()
  }
  p1(cb)
  p2(cb)
}
test()
