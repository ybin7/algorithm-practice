/**
 * async/await 原理
 */
function* gen(){
  yield 1
  yield 2
  yield 3
  return 4
}
const g = gen()
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next())

/**
 * 如果返回的是函数
 */
function fn(count) {
  console.log(count)
  return count
}

// 如果返回的是异步函数
function fnP() {
  return new Promise().reslove(1)
}
function* genFn() {
  yield fn(1)
  yield fn(2)
  return 3
}



const gFn = genFn()

console.log(gFn.next())
console.log(gFn.next())