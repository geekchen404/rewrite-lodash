// 原型链
function Super() {
  this.supername = 'super'
}//super构造函数
Super.prototype.getSuperName = function () {
  return this.supername
}//构造函数原型对象上面的方法
function Sub() {
  this.subname = 'sub'
}//Sub的对象
Sub.prototype = new Super()//两句话相等
Sub.prototype = super._proto_//两句话相等
//让sub的原型对象指向super的实例，那这个实例的_proto_指向super的原型对象
Sub.prototype.getSubName = function () {
  return this.subname
}//再在自己的原型对象上新增方法

var sun = new Sub()//sun是sub的实例
console.log(sun.getSuperName())  //打印出sun的某个方法
// 答案是super

// 下面这句话就是原型的基本的继承方式
// Sub.prototype = new Super()


//使用原型链继承的缺点
function SuperType() {
  this.color = ['red', 'blue', 'green']//构造函数有个数组
}
function SubType() { }
SubType.prototype = new SuperType()//通过原型继承
var instance1 = new SubType()//创建实例1
instance1.color.push('black')
//这里改变了原型对象上面的数据，这样一来原本构造函数上面的原型对象的属性就被改变
console.log(instance1.color)//['red', 'blue', 'green','black']
var instance2 = new SubType()//创建实例2
console.log(instance2.color)//['red', 'blue', 'green','black']
// 某个 构造函数 的 原型对象 指向了另一个 构造函数的实例 的 原型对象
// 这里会导致的问题是，Subtype的实例都会共享同一个数据，一旦被修改，其他的实例的方法都被改变



// 借用构造函数继承
function Super() {
  this.supername = 'super'
}//super构造函数
function Sub() {
  Super.call(this)
  this.subname = 'sub'
}

// 组合继承
function SuperType(name) {
  this.name = name
  this.color = ['red', 'blue', 'green']//构造函数有个数组
}
SuperType.prototype.sayname = function () {
  alert(this.name)
}
function SubType(name, age) {
  SuperType.call(this, name)//借用构造函数继承
  this.age = age
}
SubType.prototype = new SuperType()//原型链继承
// 这样一来属性独立，方法共享，是最常用的继承方式

