const obj = {
  c: 3,
  getName() {
    console.log(this.c)
  }
}

const proxy = new Proxy(obj, {
  get(o, key) {
    console.log('读取了数据', o, key)
  },
  set(o, key, val) {
    console.log('set data', o, key)
    return val
  }
})
proxy.a = 1

proxy.getName()

console.log(proxy.c)
console.log(proxy)
