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

const obj = {
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
 */
function myNew() {
  let obj = {}
  const _constructor = Array.prototype.shift.apply(arguments)

  obj.__proto__ = _constructor.prototype
  const result = _constructor.apply(obj, arguments)

  return result instanceof Object ? result : obj;
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

  let copyObj = {}

  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      copyObj[key] = deepClone(obj[key])
    } else if (!obj.hasOwnProperty(key)) {
      break
    } else {
      copyObj[key] = obj[key]
    }
  }

  return copyObj
}


/**
 * 函数柯里化
 */
function curry(fn, args) {
  let fnLen = fn.length
  console.log('fnLen', fn.length)
  args = args || []

  return function () {
    console.log('arguments', arguments)
    let _args = args.concat(Array.prototype.slice.call(arguments))
    if (_args.length < fnLen) {
      return curry.call(this, fn, _args);
    } else {
      return fn.apply(this, _args);
    }
  }
}


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
 */
function Instanceof(left, right) {
  let leftVal = Object.getPrototypeOf(left);
  const rightVal = right.prototype;

  while (leftVal !== null) {
    if (leftVal === rightVal) return true;
    leftVal = Object.getPrototypeOf(leftVal);
  }
  return false;
}


