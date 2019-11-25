function* gen() {
  console.log('1');
  const a = yield squareAsync(2)
  let b = yield squareAsync(a)
  b++
  const c = yield squareAsync(b)
  const d = yield normalFunc()

  console.log('gen done');
  return [c, d]
}

function squareAsync(n) {
  console.log(`square async`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`in timer func`);
      resolve(n * n)
    }, 1200);
  })
}

function normalFunc() {
  return 10
}

function run(generatorFunc, ...args) {
  return new Promise((resolve, reject) => {
    const g = generatorFunc()
    const onResolved = continuer.bind(null, 'next')
    const onRejected = continuer.bind(null, 'throw')
    onResolved()

    function continuer(verb, ...args) {
      try {
        const ret = g[verb](...args)  // 这里等同 await 函数, await 函数之后的都是 promise
        if (ret.done) return resolve(ret.value)
        return Promise.resolve(ret.value).then(onResolved, onRejected)
      } catch (error) {
        throw error
      }
    }
  })
}


run(gen)
  .then(console.log)

const a = async () => {
  const v = await PromiseFunc
  console.log(v);
}