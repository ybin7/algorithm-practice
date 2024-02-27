/**
 * 实现一个数组 map
 * 1. 传入是一个函数, 和一个 this 指向
 * 2. 返回一个新数组，并通过函数处理值
 * 3. 回调函数的参数为：当前值，idx，当前数组
 */
Array.prototype.myMap = function (fn) {
  console.log(typeof fn)
  if (typeof fn !== 'function') {
    throw new Error('callback must function')
  }

  const arr = this
  const len = this.length

  const temp = new Array(len) // 创建新数组用于存储结果
  console.log('1111', arguments[1])
  for (let i = 0; i < len; i++) {
    temp[i] = fn.call(arguments[1], arr[i], i, arr)
  }

  return temp
}
const arr = [1, 3, 4, 6, 7]

console.log(arr.myMap(function(item) {
  return item * 2
}))