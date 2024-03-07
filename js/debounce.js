/**
 * 防抖函数
 * 1. 将高频操作优化为最后只执行一次
 * @param { Function } fn 
 * @param { boolean } immediate 是否立即执行
 * @param { number } wait 
 */
function debounce(fn, wait, immediate) {
  let timer = null

  return function(...args) {
    if (immediate && !timer) {
      fn.apply(this, args)
    }

    timer && clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

/**
 * 节流函数：
 * 每隔一段时间执行一次，降低频率（滚动条事件，resize事件，）
 * 定时器版本
 */
function throttle(fn, wait) {
  let timer = null

  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
      }, wait)
    }
  }
}

function timeThrottle(fn, wait) {
  let preTime = 0

  return function (...args) {
    let now = new Date().getTime() // 或者可以用+new Date() 获取事件戳

    if (now - preTime > wait) {
      preTime = now
      fn.apply(this, args)
    }
  }
}