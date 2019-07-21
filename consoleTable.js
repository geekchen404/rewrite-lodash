/**
 * 实现console.table方法
 *
 * test:
 * 数组，数组对象，对象，
 * 原始类型：只展示一行
 *
*/

/**
 * 得到每列单元格的最小宽度
 * 先遍历整个表头，在遍历每个表头的时候，遍历整个对应的数据，得到每个表头的最小宽度
 */
function minWidth(data, head) {
  let max = 0;
  for (key in head) {
    max = key.toString().length;
    data.map((obj) => {
      if (key in obj) {
        max = Math.max(max, obj[key].toString().length)
        head[key] = max;
      }
    })
  }
  return head;
}

/**
 * 返回表头
 */
function drowTableHead(head) {
  let str = '| ' + '(index)' + ' |';
  for (key in head) {
    str = str + key.toString().padEnd(head[key]) + '  |'
  }
  let line = getLine(str)
  return '\n' + line + str + '\n' + line;
}

function getLine(str) {
  return ''.padEnd(str.length, '-') + '\n';
}

/**
 * 返回表格内容
 */
function drowTableBody(data, head) {
  let i = 0;
  let strs = ''
  let str = '| ' + `${i}`.padEnd(8) + '|';
  data.map((obj) => {
    for (key in head) {
      if (!(key in obj)) {
        let empty = ''
        str = str + empty.toString().padEnd(head[key]) + '  |'
      } else {
        str = str + obj[key].toString().padEnd(head[key]) + '  |'
      }

    }
    i++;
    str = str + '\n'
    strs += str;
    str = '| ' + `${i}`.padEnd(8) + '|';
  })
  return strs;
}

/**
 * 得到表头,返回表头的对象
 */
function getTableHead(data) {
  let head = {}
  data.map((obj) => {
    for (key in obj) {
      if (!head[key]) {
        head[key] = key;
      }
    }
  })
  return head;
}

/**
 * 实现一个table的函数
 * 接受参数，实现表格
 * 需要判断类型的函数，需要遍历对象的函数，最后得到的一定是一维或者二维数组
 * 表头的函数，第一列和最后一列
 */
function drowTable(data) {
  // 这里的data是一个数组对象，it是一个对象
  // head是表头，先获取的是整个对象里面的每个属性，
  let head = getTableHead(data)
  // 这里的表头返回的是，每个属性的值为对应的最小宽度
  // 即为每一列的最小宽度得到了
  head = minWidth(data, head);
  let tableHead = drowTableHead(head);
  let tableBody = drowTableBody(data, head)
  let str = '| ' + '(index)' + ' |';
  for (key in head) {
    str = str + key.toString().padEnd(head[key]) + '  |'
  }
  let bottomLine = getLine(str)
  return tableHead + tableBody + bottomLine;
}


/**
 * todo:先实现最简单的
 * 有字段多或者少的情况
 * 
 */
var data = [{
  name: 'dianwei',
  age: 8,
  score: 88,
  thisistoshowthemaxnameoftablehead: 'f'
}, {
  age: 8,
  score: 234567890,
  email: '1747490006@qq.com',
  name: 'jake',
}, {
  name: 'marry',
  age: 8,
  score: 12329333333333338,
}]