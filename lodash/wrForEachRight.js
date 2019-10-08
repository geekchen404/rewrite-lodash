/**
 * 从右到左遍历数组，即为逆向遍历
 * 返回：原本的集合
 */
function forEachRight(collection, iteratee = null) {
  if (iteratee == null) return collection;
  let right = []
  for (let key in collection) {
    right.push(key)
  }
  for (let i = right.length - 1; i > -1; i--) {
    let val = collection[right[i]]
    let key = right[i]
    iteratee(val, key, collection)
  }
  return collection;
}