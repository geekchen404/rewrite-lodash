

/**
 * 求所有数组的并集(不重复的交集)
 * @param  {Arrays} array 
 * @test intersection([1,2,3,4,3],[3,4,3,5,7])=>[3, 4]
 */
function intersection(...array) {
  let cur = array[0]
  if (array.length > 1) {
    array.slice(1).forEach(eachAry => {
      cur = cur.length == 0 ? '' : hasSameData(cur, eachAry)
    });
  }
  return cur;
}

function hasSameData(cur, ary) {
  let res = []
  let data = {}
  for (let val of cur) data[val] = val
  for (let a of ary) if (data[a] && !res.includes(a)) res.push(a)
  return res;
}
