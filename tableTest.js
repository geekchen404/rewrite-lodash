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
var ary = [7, 6, 5, 4, 3]
class Table {
  constructor() {
    this.head = null;
    this.headStr = null;
    this.data = null;
  }

  minWidth() {
    let max = 0;
    for (let key in this.head) {
      max = key.toString().length;
      this.data.map((obj) => {
        if (key in obj) {
          max = Math.max(max, obj[key].toString().length)
          this.head[key] = max;
        }
      })
    }
  }

  drowTableHead() {
    let str = '| ' + '(index)' + ' |';
    for (let key in this.head) {
      str = str + key.toString().padEnd(this.head[key]) + '  |'
    }
    this.headStr = str;
    let line = this.getLine()
    return '\n' + line + str + '\n' + line;
  }

  getLine() {
    return ''.padEnd(this.headStr.length, '.') + '\n';
  }

  drowTableBody() {
    let i = 0;
    let strs = ''
    let str = '| ' + `${i}`.padEnd(8) + '|';
    this.data.map((obj) => {
      for (let key in this.head) {
        if (!(key in obj)) {
          let empty = ''
          str = str + empty.toString().padEnd(this.head[key]) + '  |'
        } else {
          str = str + obj[key].toString().padEnd(this.head[key]) + '  |'
        }
      }
      i++;
      str = str + '\n'
      strs += str;
      str = '| ' + `${i}`.padEnd(8) + '|';
    })
    return strs;
  }

  getTableHead() {
    this.head = {}
    this.data.map((obj) => {
      for (let key in obj) {
        if (!this.head[key]) {
          this.head[key] = key;
        }
      }
    })
  }

  typeOfProps(props) {
    let type = typeof (props)
    if (type == 'object') {
      this.data = props;
      return true;
    } else {
      return true;
    }
  }

  drowTable(props) {
    if (this.typeOfProps(props)) {
      this.getTableHead()
      this.minWidth();
      let tableHead = this.drowTableHead();
      let tableBody = this.drowTableBody()
      let bottomLine = this.getLine()
      return tableHead + tableBody + bottomLine;
    } else {
      return props;
    }
  }
}

table = new Table()
table.drowTable(ary)

