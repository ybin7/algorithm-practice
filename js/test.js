/**
 * 实现一个 reduce
 * 1. 接收一个函数， 一个初始化值，如果不传默认取数组第一个
 * 
 */
Array.prototype.myReduce = function (fn) {
  if (typeof fn !== 'function') {
    throw new Error('must function')
  }

  const arr = this
  const len = arr.length

  let k = 0 // 索引值
  let result; // 最终的结果

  if (arguments.length > 1) {
    result = arguments[1]
  } else {
    while(k < len && !(k in arr)) {
      k++
    }
    if (k >= len) {
      throw new Error('array not null')
    }
    result = arr[k]
    k++
  }

  while(k < len) {
    if (k in arr) {
      result = fn(result, arr[k], k, arr)
    }
    k++
  }

  return result
}

const testArr = [1, 2, ,3, 5 ]

const sum = testArr.myReduce(function(sum, pre) {
  return sum + pre
})

console.log(sum)