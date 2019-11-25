const json_parse = function () {
  var
    at,
    ch,
    escapee = {
      '"': '"',
      '\\': '\\',
      '/': '/',
      b: 'b',
      f: '\f',
      n: '\n',
      r: '\r',
      t: '\t'
    },
    text,
    // 抛出异常
    error = function (m) {
      throw {
        name: 'SyntaxError',
        message: m,
        at: at,
        text: text
      }
    },
    // 获取下一个字符
    next = function (c) {
      if (c && c !== ch) {
        error(`Expected ${c} instead of ${ch}`);
      }
      ch = text.charAt(at);
      at += 1;
      return ch;
    },
    // 解析一个数字值
    number = function () {
      var number, string = '';
      // 负号
      if (ch === '-') {
        string = '-',
          next('-')
      }
      // 整数
      while (ch >= '0' && ch <= '9') {
        string += ch;
        next();
      }
      // 小数
      if (ch === '.') {
        string += '.';
        while (next() && ch >= '0' && ch <= '9') {
          string += ch;
        }
      }
      // 指数
      if (ch === 'e' || ch === 'E') {
        string += ch;
        next();
        if (ch === '-' || ch === '+') {
          string += ch;
          next();
        }
        while (ch >= '0' && ch <= '9') {
          string += ch;
          next();
        }
      }
      number = +string;
      if (isNaN(number)) {
        error('Bad number')
      } else {
        return number;
      }
    },
    // 解析一个字符串值
    string = function () {
      var hex,
        i,
        string = '',
        uffff;
      // 字符串必须以双引号开始
      if (ch === '"') {
        while (next()) {
          if (ch === '"') {
            next();
            return string;
          } else if (ch === '\\') {
            next();
            // unicode码
            if (ch === 'u') {
              uffff = 0;
              for (i = 0; i < 4; i++) {
                hex = parseInt(next(), 16);
                if (!isFinite(hex)) {
                  break;
                }
                ufff = ufff * 16 + hex;
              }
              string += String.fromCharCode(ufff)
            } else if (typeof escapee[ch] === 'string') { // 转义字符
              string += escapee[ch]
            } else {
              break;
            }
          } else {
            string += ch;
          }
        }
      }
      error('Bac string');
    },
    // 跳过空白
    white = function () {
      while (ch && ch <= ' ') {
        next();
      }
    },
    // 解析 true、false、null
    word = function () {
      switch (ch) {
        case 't':
          next('t');
          next('r');
          next('u');
          next('e');
          return true;
        case 'f':
          next('f');
          next('a');
          next('l');
          next('s');
          next('e');
          return true;
        case 'n':
          next('n');
          next('u');
          next('l');
          next('l');
          return true;
      }
      error(`Unexpected ${ch}`)
    },
    // 解析一个数组值
    array = function () {
      var array = [];
      if (ch === '[') {
        next('[');
        white();
        if (ch === ']') {
          next(']');
          return array;
        }
        while (ch) {
          array.push(value());
          white();
          if (ch === ']') {
            next(']');
            return array;
          }
          next(',');
          white();
        }
      }
      error('Bad array');
    },
    // 解析一个对象值
    object = function () {
      var key, object = {};
      if (ch === '{') {
        next('{');
        white();
        if (ch === '}') {
          next('}');
          return object;
        }
        while (ch) {
          key = string();
          white();
          next(':');
          object[key] = value();
          white();
          if (ch === '}') {
            next('}');
            return object;
          }
          next(',');
          white();
        }
      }
      error('Bad object');
    },
    // 解析一个JSON值。它可以是对象、数组、字符串、数字、一个词。
    value = function () {
      white();
      switch (ch) {
        case '{':
          return object();
        case '[':
          return array();
        case '"':
          return string();
        case '-':
          return number;
        default:
          return ch >= '0' && ch <= '9' ? number() : word();
      }
    };
  // 返回json_parse函数
  return function (source, reviver) {
    var result;
    text = source;
    at = 0;
    ch = ' ';
    result = value();
    white();
    if (ch) { // 多余的非空白字符
      error('Syntax error');
    }
    return typeof reviver === 'function' ? function walk(holder, key) {
      var k, v, value = holder[key];
      if (value && typeof value === 'object') {
        // 递归处理对象的属性
        for (k in value) {
          if (Object.hasOwnProperty.call(value, k)) {
            v = walk(value, k);
            if (v !== undefined) {
              value[k] = v;
            } else {
              delete value[k]
            }
          }
        }
      }
      // 处理对象
      return reviver.call(holder, key, value);
    }({
      '': result
    }, '') : result;
  }
}();