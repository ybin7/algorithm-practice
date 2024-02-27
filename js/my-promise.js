/**
 * 实现一个Promise
 * 1. 定义状态常量
 */
const REJECTED = 'rejected'
const FULFILLED = 'filfilled'
const PENDING = 'pending'

class MyPromise {
  constructor(executor) {
    this._state = PENDING
    this._promiseResult = null
    
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
    this.handles = []
    executor(this.resolve, this.reject)
  }

  resolve(val) {
    this.stateChange(FULFILLED, val)
  }

  reject(reason) {
    this.stateChange(REJECTED, reason)
  }

  stateChange(state, result) {
    if (this._state !== PENDING) return
    this._state = state
    this._promiseResult = result

    while(this.handles.length) {
      const {
        onFulfilledCb,
        onFaillCb
      } = this.handles.shift()
      if (this._state === FULFILLED) {
        onFulfilledCb(result)
      }
      if (this._state === REJECTED) {
        onFaillCb(result)
      }
    }
  }

  then(onFulfilledCb, onFaillCb) {
    if (typeof onFaillCb !== 'function') {
      onFaillCb = val => val
    }
    if (typeof onFulfilledCb !== 'function') {
      onFulfilledCb = val => val
    }

    const thenPromise = new MyPromise((thenResolve, thenReject) => {
      const resolvePromise = cb => {
        setTimeout(() => {
          try {
            const x = cb(this._promiseResult)
            
            if (x instanceof MyPromise) {
              x.then(thenResolve, thenReject)
            } else {
              thenResolve(x)
            }
          } catch (error) {
            thenReject(error)
            throw new Error(error)
          }
  
        })
      }

      switch(this._state) {
        case FULFILLED: 
          resolvePromise(onFulfilledCb)
          break
        case REJECTED: 
          resolvePromise(onFaillCb)
          break
        case PENDING:
          this.handles.push({
            onFulfilledCb,
            onFaillCb
          })
      }
    })
    
    return thenPromise
  }

  /**
   * 1. 接收一个promise数组
   * 2. 所有promise成功，则成功返回这个数组
   * 3. 又一个人失败则返回失败的结果
   */
  static all(promises) {
    const result = []

    return new MyPromise((resolve, reject) => {
      promises.forEach((promise, idx) => {
        if (promise instanceof MyPromise) {
          promise.then(res => {
            result[idx] = res
            if (result.length === promises.length) resolve(result)
          }, err => reject(err))
        } else {
          result[idx] = promise
          if (result.length === promises.length) resolve(result)
        }
      })
    })
  }
}

const p = new MyPromise((resolve, reject) => {
    resolve(1)
}).then(res => {
  console.log('then1', res)
  return new MyPromise((resolve, reject) => resolve(2 * res))
}).then(res => {
  console.log('then2', res)
})
console.log(1)
console.log('-------------------------')
const p2 = new Promise((resolve, reject) => {
  resolve(1)
}).then(res => {
  console.log('p2:then1', res)
  return new Promise((resolve, reject) => resolve(2 * res))
}).then(res => {
  console.log('p2:then2', res)
})

