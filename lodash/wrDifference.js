function wrDifference(array, value = []) {
  let res = []
  let data = {}
  if (arguments.length > 2) {
    for (let i = 2; i < arguments.length; i++) {
      value.push(...arguments[i])
    }
  }
  if (value.length > 0) {
    value.map((v) => {
      data[v] = v;
    })
  }
  if (array.length > 0) {
    array.map((a) => {
      if (!(a in data)) {
        res.push(a)
      }
    })
  }
  return res
}