function helper(list) {
  if (list.length <= 1) return list;
  // 空间复杂度 nlogn
  const bigger = [];
  const smaller = [];
  const pivotIndex = Math.floor(Math.random() * list.length);
  const pivot = list[pivotIndex];
  // 时间复杂度O(nlogn)
  for (let i = 0; i < list.length; i++) {
    const number = list[i];
    if (i === pivotIndex) continue;
    if (number >= pivot) {
      bigger.push(number);
    } else {
      smaller.push(number);
    }
  }
  return helper(smaller)
    .concat([pivot])
    .concat(helper(bigger));
}


function quickSort(list) {
  return helper(list);
}

// test

const l = quickSort([1, 3, 2, 9, 6, 5, 1, 0, -2, 10]);
console.log(l);




function sorrt(ary) {

}
function quickSort(ary) {
  let left = []
  let middle = []
  let right = []
  let cen = ary[0]
  for (let it of ary) {
    if (it < cen) {
      left.push(it)
    } else if (it = cen) {
      middle.push(it)
    } else {
      right.push(it)
    }
  }
  let leftpart = quickSort(left)
  let rightpart = quickSort(right)
  return [...leftpart, ...middle, ...rightpart]
}

var sortArray = function (nums) {
  let left = []
  let middle = []
  let right = []
  let cen = nums[0]
  for (let it of nums) {
    if (it < cen) {
      left.push(it)
    } else if (it = cen) {
      middle.push(it)
    } else {
      right.push(it)
    }
  }
  let leftpart = sortArray(left)
  let rightpart = sortArray(right)
  return [...leftpart, ...middle, ...rightpart]
};