/**
 * 使用promise.all 进行5个请求，若其中一个失败了，怎么让其他4个成功返回
 */

function promsieFunc(timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (timeout % 2) {
        resolve(1)
      } else {
        reject(2)
      }
    }, timeout * 100);
  })
}

function testPromiseAll() {
  const promises = [10, 2, 4, 5, 3].map(item => promsieFunc(item))

  Promise.all(promises).then(res => {
    res.map(item => {
      console.log(item)
    })
  })
}
testPromiseAll()

function getData(api){
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      var ok = Math.random() > 0.5  // 模拟请求成功或失败
      if(ok)
        resolve('get ' + api + ' data')
      else{
        resolve('error')    // Promise all的时候做判断  如果是error则说明这条请求失败
      }
    },2000)
  })
}
function getDatas(arr){
  var promises = arr.map(item => getData(item))
  return Promise.all(promises).then(values => {
    values.map((v,index) => {
      if(v == 'error'){
        console.log('第' + (index+1) + '个请求失败')
      }else{
        console.log(v)
      }
    })
  }).catch(error => {
    console.log(error)
  })
}
getDatas(['./api1','./api2','./api3','./api4']).then(() => '请求结束')

/**
 * 函数柯里话
 */
function curry(fn, len = fn.length) {
  return _curry(fn, len)
}

function _curry(fn, len, ...arg) {
  return function (...params) {
      let _arg = [...arg, ...params]
      if (_arg.length >= len) {
          return fn.apply(this, _arg)
      } else {
          return _curry.call(this, fn, len, ..._arg)
      }
  }
}

let fn = curry(function (a, b, c, d, e) {
  console.log(a + b + c + d + e)
})

fn(1, 2, 3, 4, 5)  // 15
fn(1, 2)(3, 4, 5)
fn(1, 2)(3)(4)(5)
fn(1)(2)(3)(4)(5)

