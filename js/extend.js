/**
 * 原型链继承
 * 缺点：1. 数据共用
 * 2. 不能传值
 */
function Person (name) {
  this.name = name
}

Person.prototype.getName = function () {
  console.log(this.name)
}

function Child() {
 
}

Child.prototype = new Person()

/**
 * 构造函数继承
 * 1. 避免了数据公用
 * 2. 可以在Child2中向Preson传参
 * 
 * 缺点： 方法都在构造函数中定义，每次创建都要创建方法
 */
function Child2() {
  Person.call(this)
}

/**
 * 组合继承
 * 融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。
 * 缺点： 组合继承最大的缺点是会调用两次父构造函数。
 * 子类型实例的原型 一次
 * 创建子类型实例 一次
 */
function Child3(name) {
  Person.call(this, name)
}

Child3.prototype = new Person()
Child3.prototype.constructor = Child3

/**
 * 原型式继承
 * createObj
 * 包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。
 */
function createObj(obj) {
  function F() {}
  F.prototype = obj
  return new F()
}

/**
 * 寄生式继承
 * 创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象
 * 跟借用构造函数模式一样，每次创建对象都会创建一遍方法。
 */
function createObj2(o) {
  var clone = Object.create(o);
  clone.sayName = function () {
      console.log('hi');
  }
  return clone;
}

/**
 * 寄生组合式继承
 * 这种方式的高效率体现它只调用了一次 Parent 构造函数，
 * 并且因此避免了在 Parent.prototype 上面创建不必要的、
 * 多余的属性。与此同时，原型链还能保持不变；
 * 因此，还能够正常使用 instanceof 和 isPrototypeOf。
 * 开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。
 */
function Child4(name, age) {
  Person.call(this, name)
}

const F = function (){}
F.prototype = Person.prototype

Child4.prototype = new F()

