
/**
 * state: 1:padding，2：resolve，3：jeject
 * @param {function} f 接受成功失败的定义函数 
 */
function promise(executor) {
  let self = this;
  self.state = 1;//promise当前的状态
  self.data = undefined;//promise的最终值
  self.onSuccessCallback = []//promise所有的成功回调函数集合
  self.onRejectCallback = []//promise所有失败的回调函数

  function resolve() {

  }
  function reject() {

  }
  executor(resolve, reject)
}



var arys = [1, 2, 3, 4, 44, 6]
var getArys = new Promise(fn)
var fn = (resolve, reject) => {
  var isAllTrue = true
  arys.forEach((it, idx) => {
    if (idx + 1 !== it) {
      isAllTrue = false
      reject(it)
    }
  })
  if (isAllTrue) {
    resolve(isAllTrue)
  }
}

var getAry2 = getArys.then(val => {
  console.log(`${val}为true表示该数组全部符合标准`)
  return val
}).catch(reason => {
  console.log(`${reason}的下标不符合标准`)
  // throw reason
  return 4
})


var getAry2 = getArys.then(val => {
  console.log(`${val}为true表示该数组全部符合标准`)
  return val
}, reason => {
  console.log(`${reason}的下标不符合标准`)
  // throw reason
  return 4
})


function red() {
  console.log('red');
}
function green() {
  console.log('green');
}
function yellow() {
  console.log('yellow');
}

function light() {
  while (true) {
    setTime()
  }
}
light()


console.log('1');

setTimeout(function time1() {
  console.log('2');
  process.nextTick(function () {
    console.log('3');
  })
  new Promise(function (resolve) {
    console.log('4');
    resolve();
  }).then(function () {
    console.log('5')
  })
})
process.nextTick(function () {
  console.log('6');
})
new Promise(function (resolve) {
  console.log('7');
  resolve();
}).then(function () {
  console.log('8')
})

setTimeout(function time2() {
  console.log('9');
  process.nextTick(function () {
    console.log('10');
  })
  new Promise(function (resolve) {
    console.log('11');
    resolve();
  }).then(function () {
    console.log('12')
  })
})

// 答案：1, 7, 6, 8, 2, 4, 3, 5, 9, 11, 10, 12


let bb = new Promise(function (resolve) {
  console.log('7');
  resolve();
}).then(function () {
  try {
    console.log(aaa)
  } catch (error) {
    throw (error)
  }
})



const first = () => (new Promise((resolve, reject) => {
  console.log(3);
  let p = new Promise((resolve, reject) => {
    console.log(7);
    setTimeout(() => {
      console.log(5);
      resolve(6);
    }, 0)
    resolve(1);
  });
  resolve(2);
  p.then((arg) => {
    console.log(arg);
  });

}));

first().then((arg) => {
  console.log(arg);
});
console.log(4);
