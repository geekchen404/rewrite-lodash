// 面试题：递归实现给定一个对象将对象变为geter会让seter
// 其实就是遍历对象
function observe(obj) {
  for (let prop in obj) {
    let val = obj[prop]
    if (typeof val === 'object') {
      val = observe(val)
    }
    Object.defineProperty(obj, prop, {
      set: function (value) {
        if (typeof value === 'object') {
          value = observe(value)
        }
        console.log(`把${val}改成${value}`)
        val = value
      },
      get: function () {
        console.log('get', val)
        return val
      }
    })
  }
  return obj
}


// 进阶实现，在修改数据的时候不会马上发生改变而是在数据变更结束后一起改变
// 增加函数，实现上面的功能，即为在连续多次的dom更新中只更新一次
// 实现思路是在set的时候，实现具体功能
