/**
 * 插入一个面试001 start
 */
var fn1 = function (a, cb) {
  setTimeout(() => cb(a + 2), 300)
}

var fn2 = function (a, cb) {
  setTimeout(() => cb(a + 3), 200)
}

var fn3 = function (a, cb) {
  setTimeout(() => cb(a * 2), 100)
}

var fnArr = [fn1, fn2, fn3];

/**
 * @param { number } x  
 * @param { function[] } fnArr 
 * @param { function } fn 
 * @returns { number }
 */
function run(x, fnArr, fn) {
  let sum = x
  let flag = true

  const cb = result => {
    sum = result
    flag = true
  }

  const timer = setInterval(() => {
    if (fnArr.length == 0) {
      clearInterval(timer)
      fn(sum)
    }

    if (flag === true && fnArr.length > 0) {
      flag = false
      const curFn = fnArr.shift()
      curFn(sum, cb)
    }
  }, 300)
}


// run(1, fnArr, function (res) {
//   console.log(res) // 这里会打印出12。// 12 = (1+2+3)*2
// })

/**
 * 插入一个面试001 end
 */

/**
 * 第二章节数学开始
 */
console.log('--------------- 罗马数字转整数、Fizz Buzz 和计数质数 start ---------------')

/**
 * 描述：罗马数字转整数
 * 罗马数字包含以下七种字符：I, V, X, L, C, D 和 M。
 * 分别对应的数字为：1, 5, 10, 50, 100, 500, 1000
 * 例如：罗马数字的 （左减右加）
 * 3 => III
 * 4 => IV
 * 12 => XII
 * 26 => XXVI
 * 通常情况下，不能出现超过连续三个相同的罗马数字并且罗马数字中小的数字在大的数字右边。
 * 但也存在特例，如 4 => IV 特殊规则只适用以下6种情况：
 * I 可以放在 V 和 X 的左边来表示 4 和 9
 * X 可以放在 L 和 C 的左边，来表示 40 和 90
 * C 可以放在 D 和 M 的左边，来表示 400 和 900
 * 题目：给定一个罗马数字将其转化为整数。输入确保在 1 在 3999 的范围内
 * 方法一：遍历，先遍历特殊值，如果有特殊值，先累加特殊值，然后再用正则去掉特殊值，再遍历剩余的数字。
 * @param { string } num 罗马数字
 */
function romanToIntOne(num) {
  const roman = {
    IV: 4,
    IX: 9,
    XL: 40,
    XC: 90,
    CD: 400,
    CM: 900
  }
  const list = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  }

  let result = 0

  // 先遍历特殊值
  for (const key in roman) {
    if (num.includes(key)) {
      const reg = new RegExp(key)
      num = num.replace(reg, '')
      result += roman[key]
    }
  }

  for (const n of num) {
    result += list[n]
  }

  return result
}

console.log(romanToIntOne('MCMXCIV'))

/**
 * 方法二： switch + includes
 * 思路：先遍历所有的罗马数字进行累加，对于特殊数字的循环，比如 5 + 1 = 6，而实际是4，相差2，所以需要在结果上减2，以此类推
 * @param { string } num
 */
function remanToIntOne2(num) {
  let result = 0

  for (const c of num) {
    switch (c) {
      case 'I':
        result += 1
        break
      case 'V':
        result += 5
        break;
      case 'X':
        result += 10
        break
      case 'L':
        result += 50
        break;
      case 'C':
        result += 100
        break
      case 'D':
        result += 500
        break;
      case 'M':
        result += 1000
        break;
      default:
        console.log('reman error')
    }
  }

  // 减去特殊组合
  if (num.includes('IV') || num.includes('IX')) {
    result -= 2
  }

  if (num.includes('XL') || num.includes('XC')) {
    result -= 20
  }

  if (num.includes('CD') || num.includes('CM')) {
    result -= 200
  }

  return result
}
console.log(remanToIntOne2('MCMXCIV'))

/**
 * Fizz Buzz
 * 写一个程序，输出从 1 到 n 数字的字符串表示
 * 1. 如果 n 是 3 的倍数，输出 Fizz
 * 2. 如果 n 是 5 的倍数，输出 Buzz
 * 3. 如果 n 同时是 3 和 5 的倍数，输出 FizzBuzz
 * input: n = 15
 * output：
 * ['1', '2', 'Fizz', '4', 'Buzz', '6', '7', '8',
 * 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz'] 
 * 方法一：遍历（不写了）
 * 方法二：字符串累加
 * 思路：因为15的倍数输出FizzBuzz,正好是3的倍数输出Fizz，拼接上5的倍数输出Buzz，所以只需要单独写2个if判断将字符串拼接即可
 */
function fizzBuzz(n) {
  const result = []

  for (let i = 1; i <= n; i++) {
    let str = ''

    if (i % 3) {
      str += 'Fizz'
    }

    if (i % 5) {
      str += 'Buzz'
    }

    if (i % 3 !== 0 && i % 5 !== 0) {
      str += i
    }

    result.push(str)
  }

  return result
}

/**
 * 计算质数：统计所有小于非负整数 n 的质数的数量。
 * input: 10
 * output: 4
 * 解释：小于10的质数一共有4个，它们是 2， 3，5， 7
 * 什么是质数：指大于1的自然数中，除了1和它本身以外不再有其他因数的自然数
 * 方法一：暴力法
 * 详解：
 * 1. 首先我们定义一个方法 isPrime 用于判断一个自然数是否是质数，根据乘法交换律，判断其是否
 * 有因子的边界为 n 的平方根即可。
 * 2. 循环从 2 到 n 判断是否为质数，将数量存入 count 计数器中
 */

/**
 * 
 * @param { number } n 
 * @returns { boolean }
 */
function isPrime(n) {
  if (n === 2 || n === 3) {
    return true
  }

  if (n % 6 !== 1 && n % 6 !== 5) {
    return false
  }

  const sprtN = Math.sqrt(n) // 根据乘法交换律，判断边界为平方根即可

  for (let i = 3; i <= sprtN; i += 2) {
    if (n % i === 0) {
      return false
    }
  }
  return true
}

/**
 * 求质数的数量
 * @param { number } n 
 * @returns { number }
 */
function countPrime(n) {
  let count = 0

  for (let i = 2; i < n; i++) {
    if (isPrime(i)) count++
  }

  return count
}

console.log(countPrime(10))

/**
 * 埃拉托斯特尼筛法
 * 思路：给出要筛选数值的范围n，找出根号n以内的素数p1,p2...pk,先用2去筛，即把2留下，把2的倍数再去除，再用下一个素数3去筛选，把3留下，把3的
 * 倍数剔除掉，，接下去用下一个素数5筛，把5留下，把5的倍数剔除，不断重复下去，不断剔除不需要比对的元素
 * 每计算一个数，都要把它的倍数去除，直到n，数以下留下几个数
 * 详情：1.uint8array 数组类型表示一个8位无符号整型数组，创建时内容被初始化为0.创建完后，可以以对象的方式
 * 或使用数组下标索引的方式引用数组中的元素。
 * 2. arr 用来记录已经找过的数的倍数。内层循环中，一次把找过数的倍数，对应的arr下标元素设置为true，
 * 这样外循环时不会计数。
 * 3. 外层循环用来计数，如果arr数组对应的值是false，即表示为质数，则计数器count加一最后获取所有质数数量
 * @param { number } n
 * @returns { number }
 */
function countPrime2(n) {
  let count = 0
  const arr = new Uint8Array(n)

  for (let i = 2; i < n; i++) {
    if (!arr[i - 1]) {
      count++
      for (let j = i * i; j <= n; j += i) {
        console.log({
          i,
          j
        })
        arr[j - 1] = true
      }
    }
  }
  console.log(arr)
  return count
}

console.log(countPrime2(10))
console.log('--------------- 罗马数字转整数、Fizz Buzz 和计数质数 end ---------------')

console.log('--------------- 3的幂、Excel表列序号，快乐数和阶乘后的零 start ---------------')
/**
 * 描述：3 的幂，给定一个整数，写一个函数来判断它是否是3的幂次方
 * 进阶：如果不使用循环或者递归完成本题
 * input: 27
 * output: true
 * input: 0
 * output: false
 * 分析：3的幂，顾名思义，需要判断当前数字是否可以一直被3整除
 * 特殊情况：如果 n === 1，即 3 的 0 次幂的情况，应输出 true
 * 方法一：循环求解
 * 思路：基本想法。可以利用循环解决，排除特殊情况后，用待确定的数字n，循环除以3，看能否被3整除
 * 详解：1. 判断特殊情况，若待定值 n 小于 1，则直接返回 false
 *      2. 循环判断待定值 n 是否可以被 3 整除
 *      3. 若不可以被 3 整除则返回 false，若可以则将该数字除以3，直至循环结束
 *      4. 其余情况返回 true 
 * @param { number } n
 * @returns { boolean }
 */
function isPowerOfThree(n) {
  if (n < 1) {
    return false
  }

  while (n > 1) {
    // 如果该数字不能被3整除，则直接输出 false
    if (n % 3 !== 0) {
      return false
    } else {
      n = n / 3
    }
  }

  return true
}

/**
 * 方法二：递归
 */
function isPowerOfThree2(n) {
  if (n === 1) {
    return true
  }

  if (n <= 0) {
    return false
  }

  if (n % 3 === 0) {
    return isPowerOfThree2(n / 3)
  }

  return false
}
/**
 * 进阶版：无循环无递归
 * 既然要判断输入值是否为3的幂，我们可以巧妙的依赖它是否能被3的幂的极大值整除来判断依据。因此
 * 首先要找到3的最大次mi
 * 计算机中最大的整数是 2147483647，转换成16进制为 0x7fffffff
 * Math.log(x)/Math.log(y) 方法可以求出以 y 为底，x 的对数，即y的多少次幂是x，即maxPow。由于该
 * 值不能整除，此处maxPow只需取整数部分。最后我们可以利用Math.pow求出3的幂的极大值maxValue,并检查该值是否能整除待确定输入值
 * 详解：
 * 1. 判断特殊情况 n <= 0 时，直接返回 false
 * 2. 求计算机允许情况下3的最大次幂，记为 maxPow
 * 3. 求3的maxPow次幂值
 * 4. 判断 3 的maxPow次幂值能否能整除待定值n
 */
function isPowerOfThree3(n) {
  if (n <= 0) {
    return false
  }
  const maxPow = parseInt(Math.log(0x7fffffff) / Math.log(3))
  const maxValue = Math.pow(3, maxPow)

  return maxValue % n === 0
}
console.log(isPowerOfThree3(9))

/**
 * Excel 序号：给定一个 Excel 表格中的列名称，返回其相应的序列号
 * input -> output
 * A -> 1
 * B -> 2
 * C -> 3
 * ...
 * Z -> 26
 * AA -> 27
 * AB -> 28
 * 方法一：
 * 从末尾开始取得每一个字符对应的数 cur = c.charCodeAt() - 64 （因为 A 的caarCode 为64），因为有
 * 26个字母，所以相当于26进制，每26个数则向前进一位，数字总和 sum+= 当前数，进制位数为26则向前进一位。
 * 详解：
 * 1.创建临时变量sum和初始化进制位数 carry
 * 2.循环数组
 * 3.数字总和sum+=当前数*进制位数
 * 4.进制位数*=26
 * @param { string } s
 * @returns { number }
 */
function titleToNumber(s) {
  let sum = 0,
    sLen = s.length - 1,
    carry = 1;

  while (sLen >= 0) {
    const cur = s[sLen].charCodeAt() - 64
    sum += cur * carry
    carry *= 26
    sLen--
  }
  return sum
}
console.log(titleToNumber('AA'))

/**
 * 方法二：因为有26个字母，相当于 26 进制转 10进制
 * 详情：
 * 1.26进制转化10进制公式， ans = ans * 26 + num
 * 2.比如AB = 12 * 6 + 2， ZY = 26 * 26 + 25
 */
function titleToNumber2(s) {
  const arr = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M']
}
console.log('--------------- 3的幂、Excel表列序号，快乐数和阶乘后的零 end ---------------')

console.log('--------------- 插入一个面试题 start ---------------')
/**
 * 实现一个 [1, 2, 3, 4].settop(4) 输出 [4, 1, 2, 3]
 */
Array.prototype.settop = function (item) {
  let _idx = this.indexOf(item)
  console.log(_idx)
  if (~_idx) {
    this.splice(_idx, 1)
    this.unshift(item)
  } else {
    this.unshift(item)
  }
  console.log(this)
}
let arr = [1, 2, 3, 4]
arr.settop(4)
console.log(arr)

const addString = (num1, num2) => {
  //TODO your code goes here...
  let count = 0,
    numStr = '',
    num1Arr = num1.split(''),
    num2Arr = num2.split('');


  while (num1Arr.length > 0 || num2Arr.length > 0) {
    let num1CurVal = num1Arr.length > 0 ? num1Arr.pop() : 0
    let num2CurVal = num2Arr.length > 0 ? num2Arr.pop() : 0

    let sumVal = parseInt(num1CurVal) + parseInt(num2CurVal) + count

    if (sumVal >= 10) {
      sumVal -= 10
      count = 1
    }

    numStr += sumVal
  }

  let result = numStr.split('').reverse().join('')

  return result
}

console.log(addString('123456789123456789', '987654321987654321'))
console.log('--------------- 插入一个面试题 end ---------------')
console.log('--------------- 快乐数 start ---------------')
/**
 * 快乐数
 * 编写一个算法来判断是不是快乐数
 * 快乐数：对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和，然后重复这个过程
 * 直到这个数变为1，也可能是无限循环但始终变不到1，如果可以变为1，那么这个数就是快乐数。
 * 输入：19
 * 输出： true
 * 解释：
 * 1 ^ 2 + 9 ^ 2 = 82
 * 8 ^ 2 + 2 ^ 2 = 68
 * 6 ^ 2 + 8 ^ 2 = 100
 * 1 ^ 2 + 0 ^ 2 + 0 ^ 2 = 1
 * 方法一：尾递归
 * 根据示例来看，函数的执行过程是一个可以递归的过程，首先，我们先写一个递归函数来模拟这个执行过程，
 * 然后按照示例输入19来验证编程的正确性，然后输入任意数字（如99999）这时会报内存溢出，即它也可能无限循环也
 * 也始终不能变为1，是无限循环导致内存溢出，那我们如何终止这个死循环，首先我们要找到这个循环的规律：只要一个变量记录已经输入
 * 过的值，一旦出现第二次相同的输入，就终止递归，并返回非快乐数
 * 详解：
 * 1. 申请一个变量来存放已经执行过函数的输入，如果出现重复输入，则说明进入的死循环
 * 2. 将输入的19 转换为数组[1, 9]
 * 3. 将[1, 9]进行平方和运算（1^2 + 9^2 = 82）
 * 4. 判断平方和的结果是不是=等于1，如果是则为快乐数。否则继续执行，直到平方和等于1或者判定为死循环
 */


function isHappyNumber(num) {
  const fn = (n, once) => {
    if (once[n]) {
      return false
    }
  
    const list = n.toString().split('')
    let result = 0
    once[n] = true
  
    list.forEach(val => {
      result += Math.pow(parseInt(val, 10), 2)
    })

    if (result === 1) {
      return true
    } else {
      return fn(result, once)
    }
  }

  const once = {}
  return fn(num, once)
}

console.log(isHappyNumber(999))
console.log('--------------- 快乐数 end ---------------')
console.log('--------------- 阶乘后的0 start ---------------')
/**
 * 阶乘后的零
 * 给定一个整数n，返回n!结果尾数中的零的数量
 * 输入    输出    解释
 *  3      0     3! = 6
 *  5      1     5! = 120
 * 方法一：暴力法
 * 思路：
 * 1. 尾数中有0必定是10的倍数
 * 2. 尾数中有多少个0就是整个数有多少个因子10
 * 3. 因子10又可以拆成2 * 5，因此就是找数字可以拆分成多少个 2 * 5
 * 4.因为在因子中2的数量一定比5多，所以我们只需要找因子5的个数就可以找到尾数中0的个数，所以这个问题可以
 * 转换为找因子5的个数
 * 详解：
 * 1. 循环1～n,找出能被5整除的数字
 * 2. 然后看能被5整除的数字找该数字能被拆分多少个因子5
 * 3. 所有的个数相加就是尾数0的个数
 */
function trailingZeroes(n) {
  let count = 0

  for (let i = 1; i <= n; i++) {
    let num = i
    while (num % 5 === 0 && num !== 0) {
      count += 1
      num = parseInt(num / 5)
    }
  }

  return count
}

console.log(trailingZeroes(10))
console.log('--------------- 阶乘后的0 end ---------------')

console.log('--------------- 实现pow（x, n） start ---------------')
/**
 * 实现pow(x, n) 即计算x的n次幂函数
 * 2.00000, 10 => 1024.00000
 * 2.10000, 3 => 9.26100
 * 2.00000, -2 => 0.25000
 * 2^-2 = 1/22 = 1/4 = 0.25
 * 方法一：二分法
 * 思路：看到题目首先想到可以暴力计算，如果n为整数，则做 n 次底数x的累乘，如果n为负数，则做
 * n次底数（1/x）的累乘，于是有了如下代码
 */
function myPow(x, n) {
  // 判断 n 为0，1，-1
  if (n === 0) {
    return 1
  } else if (n === 1) {
    return x
  } else if (n === -1) {
    return 1 / x
  }

  const base = n > 0 ? x : 1 / x
  const half = parseInt(n / 2, 10)
  let result = myPow(x, half)

  if (n % 2) {
    return base * result * result
  }

  return result * result
}

console.log(myPow(2, -3))
/**
 * 方法二：快速幂
 * 思路：我们继续在指数n上做文章，将n看做数列之和。使得n = a1 + a2 + a3...
 * 那么由x^(a+b) = x^a*x^b,可得x^n = x^a1x^a2...x^an
 */
console.log('--------------- 实现pow（x, n） end ---------------')
console.log('--------------- 两数相除 start ---------------')
/**
 * 两数相除
 * 给定两个整数，被除数 dividend 和 除数 divisor。将两数相除，要求不使用乘法、除法和mod运算符
 * 返回被除数dividend除以除数divisor 得到的商
 * 输入 dividend = 10, divisor = 3
 * 输出 3
 * 输入 dividend = 7， divisor = -3
 * 输出 -2
 */
console.log('--------------- 两数相除 end ---------------')

console.log('--------------- 插入一个面试题 start ---------------')
/**
 * 
 * 给定一个nums数组由一些非负整数组成，现需要将他们进行排列并拼接，每个数不可拆分，使得最后的结果最大，返回值需要是string类型，否则可能会溢出
 *  提示: 1 <= nums.length <= 100;
 * 0 <= nums[i] <= 10000
 * 示例1 输入 [30, 1]
 * 输出 "301"
 * 示例2 输入 [2, 20, 23, 4, 8]
 * 输出 "8423220"
 * 示例3 输入 [2] 
 * 输出 "2"
 * 示例4 输入 [10]
 * 输出 "10"
 */
function arrayToMaxNumber(arr = []) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      let str1 = arr[j].toString()
      let str2 = arr[j + 1].toString()

      if (str1.substring(0,1) < str2.substring(0,1)) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      } else if (str1.substring(0,1) === str2.substring(0,1) && (str1 + str2 < str2 + str1)) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr.join('')
}

console.log(arrayToMaxNumber([2, 20, 23, 4, 8]))
console.log('--------------- 插入一个面试题 end ---------------')

console.log('--------------- 插入一个面试题 start ---------------')
function Foo() {
  getName = function () {
    console.log(1)
  }

  return this
}

Foo.getName = function () {
  console.log(2)
}

var getName = function () {
  console.log(4)
}

function getName() {
  console.log(5)
}

Foo.getName() // 2
getName() // 4
Foo().getName() // 1
getName() // 1

new Foo.getName() // 2
new Foo().getName() // 3
new new Foo().getName() // 3

console.log('--------------- 插入一个面试题 end ---------------')
