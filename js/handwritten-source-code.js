/**
 * 实现一个 apply
 */
Function.prototype.myApply = function (content = window, arr = []) {
  content.fn = this

  if (!Array.isArray(arr)) {
    throw new Error('params error')
  }

  let result = content.fn(...arr)

  delete content['fn']

  return result
}

/**
 * 实现一个 call 
 */
Function.prototype.myCall = function (content = window, ...args) {
  const fn = Symbol('fn')
  content[fn] = this

  let result = null
  result = content[fn](...args)

  delete content[fn]

  return result
}

/**
 * 实现一个 bind
 */
Function.prototype.myBind = function (content = window, ...args) {
  const fn = Symbol('fn')
  content[fn] = this

  let result = content[fn](...args)
  delete content[fn]

  return function () {
    result
  }
}

/**
 * @desc
 * 1. bind() 方法会创建一个新函数。
 * 当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，
 * 之后的一序列参数将会在传递的实参前传入作为它的参数。
 * 2. 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。
 * 提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。
 * @param {*} context 
 * @returns 
 * 
 */
// 实现一个bind
Function.prototype.myBind = function (ctx) {
  const params = Array.prototype.slice.call(arguments, 1)
  var fn = this
  
  return function() {
    const args = Array.prototype.slice.call(arguments)
    const allArgs = params.concat(args)

    if (new.target) {
      // const obj = {}
      // Object.setPrototypeOf(obj, fn.prototype)
      // fn.apply(obj, allArgs)
      return new fn(...allArgs)
    }
    return fn.apply(ctx, allArgs)
  }
}

const obj = {
  name: 'obj'
}

function sayName() {
  console.log('this:', this)
  console.log('this.name:', this.name)
}

const _sayName = sayName.myBind2(obj)
console.log(new _sayName())


const obj1 = {
  value: 1
}

function sayVal(a, b) {
  console.log(this)
  console.log(a, b)
  console.log(this.value)
}

sayVal.myApply(obj, [11])

function Person(name, age) {
  this.name = name
  this.age = age

  this.sayName = function () {
    console.log(this.name)
  }
}



/**
 * 实现一个 new
 * 1、创建一个对象；
 * 2、将构造函数作用域赋到创建的对象中(因此this将会指向这个新对象)；
 * 3、执行构造函数中代码；
 * 4、返回这个对象
 */
function myNew() {
  let obj = {}
  const _constructor = Array.prototype.shift.apply(arguments)

  obj.__proto__ = _constructor.prototype
  const result = _constructor.apply(obj, arguments)

  return result instanceof Object ? result : obj; // 还需要判断返回的值是不是一个对象，如果是一个对象，我们就返回这个对象，如果没有，我们该返回什么就返回什么
}

const myPerson = myNew(Person, 'ybin', '26')
myPerson.sayName()

/**
 * 深克隆
 * 
 */
function deepClone(obj) {
  if (obj === null) return null
  if (typeof obj !== 'object') return obj
  if (obj instanceof RegExp) { // 正则
    return new RegExp(obj);
  }
  if (obj instanceof Date) { // 日期
    return new Date(obj);
  }

  let objClone = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      //判断ojb子元素是否为对象，如果是，递归复制
      if (obj[key] && typeof obj[key] === "object") {
        objClone[key] = deepClone(obj[key]);
      } else {
        //如果不是，简单复制
        objClone[key] = obj[key];
      }
    }
  }

  return objClone;
}


/**
 * 函数柯里化
 * 1. 参数保存（利用闭包）
 * 2. 参数的延迟使用
 */
function curry(fn, ...args) {
  args = args || []
  console.log(fn, args)

  const inner = function () {
    args.push(...Array.prototype.slice.call(arguments, 0))
    console.log(args)
    if (args.length === fn.length) {
      return fn.apply(this, args)
    } else {
      return inner
    }
  }

  return inner
}

function fn1(x) {
  return x + 1;
}
function fn2(x) {
  return x + 2;
}
function fn3(x) {
  return x + 3;
}
function fn4(x) {
  return x + 4;
}

function compose (...fn) {
  if (fn.length === 0) return (num) => num
  if (fn.length === 1) return fn[0]

  return fn.reduce((acc, crrent) => {
    return (sum) => {
      return crrent(acc(sum))
    }
  })

}
const a = compose(fn1, fn2, fn3, fn4);
console.log(a)
console.log(a(1)); // 1+2+3+4=11





function addNum(a, b, c) {
  return a + b + c;
}

const add = curry(addNum)

console.log(add(1)(2)(7))

function curry2(fn, args) {
  let fnLen = fn.length
  args = args || []

  return function () {
    let _args = args.concat(Array.prototype.slice(arguments))

    if (args.length < fnLen) {
      return curry2.call(this, fn, _args)
    } else {
      return fn.apply(this, _args)
    }
  }
}

/**
 * 实现一个发布-订阅者模式
 */

class myEvent {
  constructor() {
    this.handles = {} // 事件容器
  }

  /**
   * 增加观察者
   * @param { string } type 
   * @param { function } handle 
   */
  addEvent(type, handle) {
    if (!(type in this.handles)) {
      this.handles[type] = []
    }

    this.handles[type].push(handle)
  }

  /**
   * 发布者
   * @param { string } type 
   * @param  {...any} params 
   */
  dispatchEvent(type, ...params) {
    if (!(type in this.handles)) {
      return new Error('未注册事件')
    }

    this.handles[type].forEach(handle => {
      handle(...params)
    })
  }

  /**
   * 删除事件
   */
  removeEvent(type, handle) {
    if (!(type in this.handles)) {
      return new Error('无效事件')
    }

    if (!handle) {
      delete this.handles[type]
      return true
    }

    const idx = this.handles[type].findIndex(ele => ele === handle)

    if (idx === -1) {
      return new Error('无绑定事件')
    }

    this.handles[type].splice(idx, 1)

    if (this.handles[type].length === 0) {
      delete this.handles[type]
    }
  }
}

const myevent = new myEvent()

function load(params) {
  console.log(params)
}

function laod2(params) {
  console.log(params)
}

myevent.addEvent('load', load)
myevent.addEvent('load', laod2)

myevent.dispatchEvent('load', 'load 发布了')

/**
 * 异步任务调度
 */
class Scheduler {
  constructor(num) {
    this.max = num
    this.list = []
    this.count = 0
  }

  async add(fn) {
    if (this.count >= this.max) {
      await new Promise(resolve => this.list.push(resolve))
    }

    this.count++

    const result = await fn()

    this.count--
    if (this.list.length) {
      this.list.unshift()()
    }

    return result
  }
}

/**
 * 实现一个 instanceof
 * 作用：用于检测构造函数的 prototype 属性是否出现在某个实例的原型链上
 * 实现思路：只要遍历实例对象的原型链，挨个往上找，直到找到最顶层的Object（null）
 * 还找不到就返回false
 */
function Instanceof(left, right) {
  let leftVal = Object.getPrototypeOf(left); // getPrototypeOf 是一个用于获取指定对象原型的方法
  const rightVal = right.prototype;

  while (leftVal !== null) {
    if (leftVal === rightVal) return true;
    leftVal = Object.getPrototypeOf(leftVal);
  }
  return false;
}

/**
 * compose 函数实现
 * 利用 compose 将两个函数组合成一个函数，让代码从右向左运行，而不是由内而外运行，可读性大大提升。这便是函数组合
 */
let add1 = x => x + 10
let multiply = y => y * 10
console.log(multiply(add1(10)))
let compose1 = function () {
  let args = [].slice.call(arguments)

  return function (x) {
    return args.reduceRight(function (total, current) {
      //从右往左执行args里的函数
      console.log(total, current)
      return current(total)
    }, x)
  }
}
let calculate = compose1(multiply, add)
console.log(calculate, calculate(10)) // 200
// 用es6实现
// const compose = (...args) => x => args.reduceRight((res, cb) => cb(res), x)

function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.getName = function () {
  console.log(this.name)
}

function Child() {
  Person.call(this)
}

Child.prototype = new Person
Child.prototype.constructor = Child

// Object.create
function createObj(o) {
  function F() { }
  F.prototype = o
  return new F()
}



