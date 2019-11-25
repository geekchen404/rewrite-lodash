// 原型链
function Super() {
  this.supername = 'super'
}
Super.prototype.getSuperName = function () {
  return this.supername
}
function Sub() {
  this.subname = 'sub'
}
Sub.prototype = new Super()
Sub.prototype.getSubName = function () {
  return this.subname
}

var sun = new Sub()
console.log(sun.getSuperName())  