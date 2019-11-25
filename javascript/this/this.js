// 最坑爹的题
let length = 10;
function fx() {
  console.log(this.length)
}


let obj = {
  length: 5,
  method(fn) {
    fn()
    arguments[0]()
  }
}

obj.method(fn, 1)


function Foo() {
  getName = function () { console.log(1) };
  return this;
}
Foo.getName = function () { console.log(2) };
Foo.prototype.getName = function () { console.log(3) };
var getName = function () { console.log(4) };
function getName() { console.log(5) };

Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();



function Foo() {
  getName = function () { console.log(1) };
  return this;
}
function getName() { console.log(5) };//函数的提升在最前面
var getName//var的定义在函数的后面
Foo.getName = function () { console.log(2) };
Foo.prototype.getName = function () { console.log(3) };
getName = function () { console.log(4) };

Foo.getName(); 2
getName(); 4
Foo().getName(); 1
getName(); 1
new Foo.getName(); 2
new Foo().getName(); 3
new new Foo().getName(); 3