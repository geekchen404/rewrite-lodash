function wrForEach(collection, iteratee = null) {
  if (iteratee == null) return collection;
  for (let key in collection) {
    iteratee(collection[key], key, collection)
  }
  return collection;
}



function aaa(ary) {
  for (let i in ary) {
    if (i = 2) break;
    console.log(ary[i])
  }
}