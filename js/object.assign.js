/**
 * 实现一个object.assign
 * @param {} target 
 * @param  {...any} source 
 * @returns 
 */
function objectAssign(target, ...source) {
  if (target === null || target === undefined) {
    throw new Error('target must object')
  }
  target = Object(target)

  for (const item of source) {
    // Reflect.ownKeys(obj)  返回一个数组，包含对象自身的所有属性，不管属性名是Symbol还是字符串，也不管是否可枚举
    const objVals = Object.getOwnPropertyDescriptors(item) // 静态方法返回给定对象的所有自有属性描述符
    console.log(objVals)
    for (const key in objVals) {
      if (objVals[key].enumerable) {
        target[key] = objVals[key].value
      }
    }
  }

  return target
}

// 由于挂载到Object的assign是不可枚举的,直接挂载上去是可枚举的，所以采用这种方式
if (typeof Object.myAssign !== 'function') {
  Object.defineProperty(Object, "myAssign", {
      value : ObjectAssign,
      writable: true,
      enumerable: false,
      configurable: true
  });
}

/**
 * 实现一个 object.create
 */
function myCreateObj(obj) {
  let F = function () {}
  F.prototype = obj
  return new F()
}

console.log(myCreateObj({ a: 2, c: 3}))