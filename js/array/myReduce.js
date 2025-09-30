/**
 * 实现一个 reduce
 * 1. 接收一个函数， 一个初始化值，如果不传默认取数组第一个
 * 
 */
Array.prototype.myReduce = function (callback, initialValue) {
  // 检查 callback 是否是函数
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  // 获取当前数组
  const array = this;

  // 初始化累积值（accumulator）
  let accumulator;
  let startIndex; // 起始索引

  // 如果有提供 initialValue，则使用它作为初始累积值
  if (initialValue !== undefined) {
    accumulator = initialValue;
    startIndex = 0; // 从数组的第一个元素开始
  } else {
    // 如果没有提供 initialValue，使用数组的第一个元素作为初始累积值
    if (array.length === 0) {
      throw new TypeError("Reduce of an empty array with no initial value");
    }
    accumulator = array[0];
    startIndex = 1; // 从数组的第二个元素开始
  }

  // 遍历数组，应用 callback 函数
  for (let i = startIndex; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array);
  }

  // 返回最终的累积值
  return accumulator;
};

const testArr = [1, 2, 5, 3, 5]

const sum = testArr.myReduce(function (sum, pre) {
  return sum + pre
})

console.log(sum)