var reg1 = /abc\dabc/;
// 当中间出现\或者/这种特殊的符号的时候，在构造函数中需要在其前面加上一个\，
var reg2 = new RegExp('abc\dabc')//错误
var reg3 = new RegExp('abc\\dabc')

var reg4 = /f[abc]o/
// 这个可以匹配: fao，fbo，fco，
// 但是只能匹配[]中的其中一个字符

var reg5 = /[^]///匹配任意符号，包括换行符

var reg6 = /foo((b\d\d)(b\w\w))/
var abc = 'abcfoob23bazcccc'
var reg66 = /foo(ba\d)+(baz)/
var abc1 = 'fooba1ba2ba3baz'
console.log(reg66.exec(abc1))
console.log(reg6.exec(abc))


var reg7 = /‘([^’]+)’/
var reg77 = /‘([^’])+’/
var abc7 = 'hello ‘world’'
console.log(reg7.exec(abc7))
console.log(reg77.exec(abc7))

// 表达日期
var day1 = 'today  is 2019-07-30 11:40:59 time'
var regday1 = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/

// ?=表示字符串的右边是foo
var cbcbc = /(?=foo)/
cbcbc.exec('abcfoobar')


'\b' = /(?<=\w)(?=\W)|(?<=\W)(?=\w)|(?<![^])|(?![^])/

var cbcbc1 = /(?<=foo)bar/

// 这里的意思是，非捕获分组，加上?:就是当前括号匹配，但是结果不放入返回数据中
let a = /(?:bar|baz)/

// exec的groups属性:?<third>为该括号的匹配内容命名，这个语法在老浏览器中无法使用
let a = /(?<third>bar|baz)/

// *****重要
// 找一个人的名字是abb形式的，
// 反1,:\1 后向引用，可以写到\9,表示\1之前的对应的第1个括号匹配的内容再一次出现
let a = /.(.)\1/
a.exec('韩朵朵 李一一 鲁迅')

// 匹配韩朵朵韩
let a = /(.)(.)\2\1/g

// 需要替换为：韩朵朵，李一一，刘启启
let c = '韩朵 李一 刘启';
let reg = /(\S)(\S)/g
// $1表示第一个字符，$2表示第二个字符
c.replace(reg, '$1$2$2')



// 了解replace函数接受的所有参数


// 注意替换
let s = 'Hopper, Grace\nMcCarthy,Join\nRitchie,Dennis'
let reg = /([])/


// 典型的复杂例子，减一，去掉复数形式
// 变为no memon 1 cabbage 100 eggs
let s = '1 memon 2 cabbages 101 eggs'
let c = /(\d+) (\w+)/g
function oo(_, amount, unit) {
  amount = Number(amount) - 1
  if (amount == 1) {
    unit = unit.slice(0, unit.length - 1)
  } else if (amount == 0) {
    amount = 'no'
  }
  return amount + ' ' + unit
}
s.replace(c, oo)



// 通配符?匹配任意一个字符，*匹配所有
function match(str, wildcard) {
  if (!str && !wildcard) return true;
  if (wildcard == '*') return true;
  var w0 = wildcard[0]
  if (w0 == '?') {
    if (!str) {
      return false
    }
    return match(str.slice(1), wildcard.slice(1))
  } else if (w0 == '*') {
    var res = wildcard.slice(1);
    // 回溯
    for (let i = 0; i <= str.length; i++) {
      if (match(str.slice(i), res)) {
        return true
      }
      return false;
    }
  } else {
    if (str[0] == w0) {
      return match(str.slice(1), wildcard.slice(1))
    } else {
      return false;
    }
  }
}


var input = 'A string with 3 number in it... 42 and 88'
var number = /\b(\d+)\b/g
var match
while (match = number.exec(input)) {
  console.log('Found', match[1], 'at', match.index)
}


// 词源，token的匹配,即为匹配一段代码/程序
var token = /\s*(\w+|[\d.]+|\+\+|\+\=|\<\=|[:.(){}\[\]]=)/gym