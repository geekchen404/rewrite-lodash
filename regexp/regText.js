
/**
 * 判断一个字符串是不是只有数字，长度为4或者6，返回真假
 * @param {数字的字符串} pin 
 * test: '1234','123','123456'
 */
function validatePIN(pin) {
  let expr = /^(\d{4})|(\d{6})$/
  let expr = /^\d{4}(\d{2})?$/
  let expr = /?=^\d{4}(\d{2})?$/

  return expr.test(pin)
}

/**
 * 将字符串除了最后四位字符的字符全部转换为#
 * 不足四位，不转换
 * @param {String} cc 
 * @returns {String} 
 * @test "Skippy","Nananananananananananananananana Batman!"
 * "##ippy","####################################man!"
 */
function maskify(cc) {
  // 所以这里的正则应该匹配到所有的字符串，除了倒数四位
  // 找到倒数第四位：
  let expr = /.*(?=....$)/g
  let str = expr.exec(cc)
  if (str == null) return cc;
  let res = ''.padEnd(str[0].length, '#');
  return cc.replace(expr, res)
}

function maskify2(cc) {
  // 一个一个找，一个一个改
  return cc.replace(/.(?=....)/g, '#')
}



function decipherThis(str) {
  //have fun!
  let expr = /(?<=\b)\d*/g
  let expr2 = /(\w+)/g;//取出每一个单词

  let expr = /\b(\d+)(\w)?(\w*?)(\w)?\b/g

  // return str.replace(expr, it => String.fromCharCode(it)).replace(expr2, it => {
  //   let n = it.length;
  //   if (n < 3) return it;
  //   return it.replace(it[1], it.slice(n - 1)).slice(0, n - 1) + it.slice(1, 2);;
  // })
};

/**
 * 去掉所有Hi后面的！
 * @param {*} s 
 */
function remove(s) {
  //coding and coding....
  return s.replace(/(?<=Hi)\!+/gi, '')
}

/**
 * 字符串中每个字符出现的次数超过一次的字符个数
 * @param {*} text 
 * @test 'aabBcde'
 */
function duplicateCount(text) {
  // test.match(/(.)(?= )/g)
}

/**
 * 切除癌细胞
 * @param {*} organism 
 */
function cutCancerCells(organism) {
  return organism.replace(/c|[a-z]?C[a-z]?/g, '')
  // Cut them!

}
/**
 * 没看懂题意
 * @param {*} string 
 */
function format(string) {
  //your code goes here!
  return string;
}

/**
 * 遇到大写将字幕用-链接，去掉所有的数字
 * @param {*} str 
 */
function kebabize(str) {
  // return
  return str.replace(/[0-9A-Z]/g, (it) => {
    if (/[0-9]/.test(it)) {
      return ''
    } else {
      return '-' + it.toLocaleLowerCase();
    }
  });
}

/**
 * 完成方法/函数，以便将破折号/下划线分隔词转换为骆驼大小写
 * 输出中的第一个单词只有在原始单词被大写时才能大写(称为上骆驼大小写，也常被称为Pascal大小写)
 */
function toCamelCase(str) {
  // let expr = /(?<=[\-\_])\w/g
  return str.replace(/.(?<=[\-\_])[^\-\_]+/g, it => {
    return it[1].toLocaleUpperCase() + it.slice(2)
  })
}

/**
 * 只使用正则表达式，您需要检查我们的字符串是否有错误。
 * 如果没有错误，它应该返回true，如果有bug，则应该返回false。
 * 如果我们的字符串包含子字符串‘bug’-使用regexp的测试应该返回false。否则是真的。 
 */
function withBugs() {
  let reg = /(?!bug)/;
  // return reg.test('Can we publish a string with bugs?')
}

/**
 * 编写一个接受字符串的函数，如果它以电话号码的形式返回true。
 * 假设从0到9的任何一个点的整数都会产生一个有效的电话号码。
 * 只需担心以下格式：(123) 456-7890(不要忘记括号后面的空格) 
 * 即为一个括号三个数字一个空格三个数字一个-四个数字
 */
function validPhoneNumber(phoneNumber) {
  //TODO: Return whether phoneNumber is in the proper form
  return /^\(\d{3}\)\s\d{3}\-\d{4}$/.test(phoneNumber)
}


/**
 * 您必须提取文件名的一部分，如下所示：
 * 假设它将以日期开头，表示为长号，后面跟着下划线，
 * 您将有一个扩展名，它始终在末尾有一个额外的扩展名。
 */
class FileNameExtractor {
  // 1_FILE_NAME.EXTENSION.OTHEREXTENSIONadasdassdassds34
  static extractFileName(dirtyFileName) {
    return /(?<=\_).*(?=\.)/g.exec(dirtyFileName)
  }
}


/**
 * 您的工作是编写一个递增字符串的函数，
 * 并创建一个新的字符串。如果字符串已经以数字结尾，
 * 则该数字应该增加1。如果字符串没有以数字结尾。数字1应该附加到新字符串中。
 */
function incrementString(strng) {
  let expr = /\d+(?=$)/
  let isAdd = true
  strng = strng.replace(expr, it => {
    isAdd = false;
    // 从头到尾为0
    if (/^0+$/.test(it)) {
      return it.slice(0, it.length - 1) + '1'
    } else {
      let n = /[^0]/.exec(it).index;
      let zero = '';
      if (n > 0) {
        zero = it.slice(0, n)
      }
      let res = '' + (Number(it) + 1);
      if (res.length == it.length) {
        return res;
      } else {
        return zero + res;
      }
    }
  })
  return isAdd == true ? strng + '1' : strng
}


// 长度8-10位
// 只包含数字和字母
// JS校验函数
// 必须有数字，也必须有字母
// 一个正则表达
/^(?=.*\d.*)(?=.*[a-zA-Z].*)[^\W_]{8,10}$/

/**
 * 编写一个函数，当将URL作为字符串时，只解析域名并将其作为字符串返回。
 */
function domainName(url) {
  return /((?<=\/\/)|(?<=www\.)).*?(?=\.)/.exec(url)
}


/**
 * 您将编写一个正则表达式，该表达式与任何字符串匹配，
 * 其中至少有一个可被4除以的数字（没有余数）。
 * 在大多数语言中，您可以使用数字%4===0轻松执行此操作。
 * 你会怎么处理Regex?HowwouldyoudoitwithRegex?数字以[开头，以]开头。
 * 它们可能（或可能不）在开始时包括正负号；这应该考虑在内。
 * 前导零可能存在，应忽略（此处无八进制；P）。
 * 字符串中可能有其他文本，在数字之外；这也应该被忽略。
 * 此外，所有数字都是整数；任何浮点都应该被忽略。
 * 如果没有如上所述定义的有效数字，则您的regex不应进行匹配。
 */
var Mod4 = /((([0|2|4|6|8|]|[^0-9])[0|4|8])|([1|3|5|7|9][2|6]))(?=[\]]|$)/



/**
 * 脚趾抽搐题，看不懂题意
 * @param {*} board 
 */
function regexTicTacToeWinChecker(board) {
  // your code here
}


/**
 * 您的任务是编写一个正则表达式(Regex)，
 * 该表达式只有在字符串包含至少一个有效日期的情况下才能匹配，
 * 格式为[mm-dd]
 * (即两个数字的月份，后面跟着一个破折号，后面跟着一个两位数的日期，加上方括号)
 * 你应该假设这一年不是闰年。
 */
var validDate = /\[\d{2}\-\d{2}\]/;
let expr = /\[((((([0][1|3|5|7|9])|11))\-(([0|1|2][1-9])|(30|31|10|20)))|((02|04|06|08|10|12)\-(([0|1|2][1-9])|10|20|30))|(02\-([0|1|2][1-8])))\]/

/**
 * 去掉单词中的某个字符（所有）
 */
String.prototype.trim = function (c) {
  if (c == undefined || c == null) return this.String;
}


/**
 * 实现加减乘除
 */
function count() {
  function zero() { }
  function one() { }
  function two() { }
  function three() { }
  function four() { }
  function five() { }
  function six() { }
  function seven() { }
  function eight() { }
  function nine() { }

  function plus() { }
  function minus() { }
  function times() { }
  function dividedBy() { }
}


String.prototype.mySearch = function (re) {

}


String.prototype.mySplit = function (re) {
  var res = []
  if (re.global) {
    var pre = re.lastIndex;
  } else {
    re = new RegExp(re.source, re, flags + 'g')
  }
  return res;
}