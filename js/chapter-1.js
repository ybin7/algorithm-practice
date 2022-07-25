const MAX_VAL = 2147483647; // 可表示的最大值
const MIN_VAL = -2147483648; // 可表示的最小值
console.time('chapter-1')

console.log('斐波那契数列 start')
/** 斐波那契数列
 * F(0) = 1, F(2) = 2, F(n = F(n - 1) + F(n - 2) (n >= 2, n 为自然数) 
 * @param { number } n 
 * @return { number }
 * @description 在n层的完全二叉中，节点的总数为 2^n - 1,所以得到 F(n) 中的递归数目上限为 2^n -1，
 * 即时间复杂度为 O(2^n)
 */
function fibonacci(n) {
  if (n == 0 || n == 1) return 1

  return fibonacci(n - 1) + fibonacci(n - 2)
}
console.time('fibonacci')
console.log(fibonacci(10))
console.timeEnd('fibonacci')

/**
 * 如何使用动态规划去解决
 */
function fibonacci2(n) {
  let meno = new Array(n + 1).fill(-1)
  meno[0] = 1
  meno[1] = 1  

  for (let i = 2; i <= n; i++) {
    meno[i] = meno[i - 1] + meno[i - 2]
  }

  return meno[n]
}

console.time('fibonacci1')
console.log(fibonacci2(40))
console.timeEnd('fibonacci1')

console.log('--------------- 斐波那契数列 end ---------------')

console.log('--------------- 翻转整数、有效的字母异位词和翻转整数 start ---------------')
/**
 *    输入      输出
 *    123       321
 *   -123      -321
 *    120       21
 * @param { number } n
 * @return { number }
 */
function reverseStr(n) {
  if (typeof n !== 'number') return;

  const rest = n > 0
    ? String(n)
      .split('')
      .reverse()
      .join('')
    : String(n)
      .slice(1)
      .split('')
      .reverse()
      .join('')

  const result = n > 0 ? parseInt(rest, 10) : 0 - parseInt(rest, 10)

  if (result >= MIN_VAL && result <= MAX_VAL) {
    return result
  }

  return 0
}

console.log(reverseStr(-123))

// 方法二
function reverseStr2(n) {
  let int = Math.abs(n)
  let num = 0

  while (int != 0) {
    num = num * 10 + (int % 10)
    int = Math.floor(int / 10)
  }

  if (num >= MAX_VAL || num <= MIN_VAL) return 0;

  return n < 0 ? num * -1 : num
}
console.log(reverseStr2(-123))

/**
 * 有效的字母异位词,即有相同的字母组成，只是位置顺序不一致
 * s = 'anagram'
 * t = 'nagaram' 
 * @param { string } s 
 * @param { string } t 
 * @return { boolean }
 */
function isAnagram(s, t) {
  const sArr = s.split('')
  const tArr = t.split('')

  const sortFn = (a, b) => a.charCodeAt() - b.charCodeAt()

  sArr.sort(sortFn) // 注：sort的实现原理：当数组的长度小于10，采用插入排序，大于10采用快排（O(nlogn)）
  tArr.sort(sortFn)
  return sArr.join('') == tArr.join('')
}

// test
const s = 'abcdefa'
const t = 'acbedfa'
console.log(isAnagram(s, t))

// 方法二
function isAnagram2(s, t) {
  if (s.length !== t.length) {
    return false
  }

  const hash = {}

  for (const k of s) {
    hash[k] = hash[k] || 0
    hash[k] += 1
  }

  for (const k of t) {
    if (!hash[k]) {
      return false
    }

    hash[k] -= 1
  }

  return true
}

console.log('--------------- 翻转整数、有效的字母异位词和翻转整数 end ---------------')

console.log('--------------- 报数、反转字符串和字符串中的第一个唯一字符 start ---------------')
/**
 * 报数
 * 报数序列是一整个序列，按照其中的整数的顺序进行报数，得到下一个数
 * 1. 1
 * 2. 11
 * 3. 21
 * 4. 1211
 * 5. 111221
 * @param { number } n
 * @return { string }
 */
function countAndSay(n) {
  if (n === 1) {
    return '1'
  }

  const preResult = countAndSay(n - 1)
  /**
   * \d 匹配一个数字
   * \1 匹配前面第一个括号的内匹配到的内容
   * (\d)\1* 匹配相邻数字相同的内容
   * 使用 repalce 方法将匹配到的内容处理成长度 + 内容的第一个字符
   */
  return preResult.replace(/(\d)\1*/g, item => `${item.length}${item[0]}`)
}

console.log(countAndSay(5))

/**
 * 方法二
 * 方法一采用递归解决，方法二采用 循环
 */
function countAndSay2(n) {
  let result = '1'

  for (let i = 1; i < n; i++) {
    result = result.replace(/(\d)\1*/g, item => `${item.length}${item[0]}`)
  }

  return result
}

console.log(countAndSay2(5))

/**
 * 反转字符串
 * 输入 => ['h', 'e', 'l', 'l', 'o']
 * 输出 => ['o', 'l', 'l', 'e', 'h']
 * @param { array } s
 * @return { array }
 * 首尾替换法
 */
function reverseStrArr(s) {
  for (let i = 0; i < s.length / 2; i++) {
    [s[i], s[s.length - 1 - i]] = [s[s.length - 1 - i], s[i]]
  }
  return s
}

console.log(reverseStrArr(['h', 'e', 'l', 'l', 'o']))

/**
 * 方法二：中间变量首尾替换法
 * 中间变量首尾交替法，逐位遍历，进行交换
 * @param { array } s
 * @return { array }
 */
function reverseStrArr2(s) {
  for (let i = 0; i < s.length / 2; i++) {
    const a = s[i]
    s[i] = s[s.length - 1]
    s[s.length - 1] = a
  }
  return s
}

console.log(reverseStrArr2(['o', 'l', 'l', 'e', 'h']))

/**
 * 字符串中的第一个唯一字符
 * "leetcode" => l 索引 0
 * "loveleetcode" => v 索引 2
 * 假定该字符串中只包含小写字母
 * 方法一：某个字符从头开始找和从尾开始找的索引如果相等，就说明这个字符只出现一次
 * @param { string } s
 * @return { number }
 */
function firstUniqCharIdx(s) {
  for (let i = 0; i < s.length; i += 1) {
    if (s.indexOf(s[i]) === s.lastIndexOf(s[i])) {
      return i
    }
  }

  return -1
}

console.log(firstUniqCharIdx('leletcode'))
/**
 * 方法二：哈希
 * 遍历两次，第一次遍历，用一个哈希对象记录所有字符的出现次数；
 * 第二次遍历，找出哈希对象中只出现一次的字符下标
 * @param { string } s
 * @return { number }
 */
function firstUniqCharIdx2(s) {
  const hash = {}

  for (let i = 0; i < s.length; i++) {
    if (!hash[s[i]]) {
      hash[s[i]] = 1
    } else {
      hash[s[i]] += 1
    }
  }

  for (let i = 0; i < s.length; i++) {
    if (hash[s[i]] === 1) {
      return i
    }
  }

  return -1
}

console.log(firstUniqCharIdx2('leetcode'))
console.log('--------------- 报数、反转字符串和字符串中的第一个唯一字符 end ---------------')

console.log('--------------- 验证回文字符串、实现strStr()、最长公共前缀和最长回文子串 start ---------------')
/**
 * 什么是回文串：即正着和反着一样如：noon，level
 * 输入：'A man, a plan, a cannal: Panama'
 * => true
 * 输入：'race a car'
 * => false
 * 思路：首先去除字母中的非字母和数字，再将数组首尾一一比较，即可得出结果
 * 方法二：利用数组反转
 * @param { string } s
 * @return { boolean }
 */
function isPalindrome(s) {
  const arr = s.toLowerCase().replace(/^[a-zA-Z0-9]\s*/g, '').split('')
  
  /**
   * 也可以利用数组的字符串反转
   * arr.reverse().join('')
   */

  let i = 0
  let j = arr.length - 1

  while (i < j) {
    if (arr[i] === arr[j]) {
      i += 1
      j -= 1
    } else {
      return false
    }
  }

  return true
}

console.log(isPalindrome('A man, a plan, a cannal: Panama'))

/**
 * 实现 strStr() 函数搜索字符串在另一字符串中是否存在
 * 即 haystack = 'hello world' needle = 'll'
 * => 2
 * 即 needle 在 haystack 中是否存在 若存在 返回index 
 * 对本题而言，当 needle 是空字符串时，我们应当返回 0
 * 方法1:遍历截取字符串对比
 * 思路：截取字符串对比的思路很简单，从匹配字符串 haystack 中截取出与需查找字符串 needle 长度相等
 * 的内容，对比截取的内容与匹配字符串是否相等，如果相等返回开始截取的下标。
 */
function strStr(haystack, needle) {
  const hayLen = haystack.length
  const nedLen = needle.length

  if (nedLen > hayLen) {
    return -1
  }

  if (!needle) {
    return 0
  }

  if (nedLen === hayLen) {
    return nedLen === hayLen ? 0 : -1
  }

  for (let index = 0; index < hayLen - nedLen; index++) {
    if (haystack[index] !== needle[0]) {
      continue;
    }

    if (haystack.substring(index, index + nedLen) === needle) {
      return index
    }
  }
  return -1
}
console.log(strStr('ndadfasdf', 'adf'))

/**
 * 方法2: 双层循环判断
 * 
 */
function strStr2(haystack, needle) {
  const hayLen = haystack.length
  const nedLen = needle.length

  if (!needle) {
    return 0
  }

  if (nedLen > hayLen) {
    return -1
  }

  if (nedLen === hayLen) {
    return haystack === needle ? 0 : -1
  }

  for (let hasIndex = 0; hasIndex <= hayLen - nedLen; hasIndex++) {
    if (haystack[hasIndex] === needle[0] && haystack[hasIndex + nedLen - 1] === needle[nedLen - 1]) {
      if (nedLen === 1) {
        return hasIndex
      }
      for (let nedIndex = 1; nedIndex < nedLen; nedIndex++) {
        if (haystack[hasIndex + nedIndex] !== needle[nedIndex]) {
          break
        }
        if (nedIndex === nedLen - 1) {
          return hasIndex
        }
      }
    }
  }

  return -1
}

console.log(strStr2('ndadfasdf', 'adf'))

console.log('--------------- 验证回文字符串、实现strStr()、最长公共前缀和最长回文子串 end ---------------')
console.log('--------------- 插入 一道小米的面试题 start ---------------')
// var name = 'global'
// let obj = {
//   name: 'obj',
//   method: () => {
//     console.log(this)
//     this.name = 'local'
//     return function () {
//       return this.name
//     }
//   }
// }
// console.log(obj.method().call(this))
console.log('--------------- 插入 一道小米的面试题 end ---------------')

console.log('--------------- 最长公共前缀 start ---------------')
/**
 * 编写一个函数来查找字符串数组中的最长公共前缀，如果不存在则返回空字符串
 * input: ["flower", "flow", "flight"]
 * otput: "fl"
 * 方法1: 递归迭代
 * @param { string[] } strs
 * @returns { string }
 */
function longestCommonPrefix(strs) {
  function findCommonPrefix(a, b) {
    let i = 0;

    while (i < a.length && i < b.length && a.charAt(i) === b.charAt(i)) {
      i++
    }

    return i > 0 ? a.substring(0, i) : ''
  }

  if (strs.length > 0) {
    let commonPrefix = strs[0]

    for (let i = 1; i < strs.length; i++) {
      commonPrefix = findCommonPrefix(commonPrefix, strs[i])
    }

    return commonPrefix
  }

  return ''
}
console.log(longestCommonPrefix(['flower', 'flow', 'floight']))
/**
 * 循环迭代
 * 方法二
 * 最长公共前缀一定是数组中所有数组都包含的前缀子串，我们可以将任意字符串的前缀作为公共前缀，从长度0-n（n为该字符串的长度）
 * 横向扫描数组中的所有字符串，看是否都有该前缀，直到找到不满足的为止。
 * @param { string[] } strs
 * @returns { string }
 */
function longestCommonPrefix2(strs) {
  if (strs.length === 0) {
    return ''
  }

  let i = 0,
    flag = true;

  while (flag) {
    if (strs[0].length > i) {
      const char = strs[0].charAt(i)
      
      for (let j = 1; j < strs.length; j++) {
        if (strs[j].length <= 1 || strs[j].charAt(i) !== char) {
          flag = false
          break;
        }
      }
    } else {
      flag = false
    }

    i++
  }

  return strs[0].substring(0, i - 1)
}

console.log(longestCommonPrefix2(['flower', 'flow', 'floight']))
console.log('--------------- 最长公共前缀 end ---------------')

console.log('--------------- 最长回文子串 start ---------------')
/**
 * 描述：给定一个字符串s，找到 s 中最长的回文子串，假设 s 的最大长度为1000。
 * input: 'babad'
 * output: 'bab'
 * 'aba' 也是有效答案
 * 方法一：动态规划法
 * 思路：动态规划的思想是希望把问题划分成 相关联的子问题；然后从最基本的子问题出发来推导较大
 * 的子问题，直到所有的子问题都解决。
 * 根据字符串的长度，建立一个矩阵 dp，通过不同的情况的判断条件，通过dp[i][j],表示 s[i] 至 s[j]
 * 所代表的子串是否是回文子串。
 * 1. 建立矩阵 dp
 * 2. 循环遍历字符串，取得不同长度的子串
 * 3. 不同长度的子串，根据不同的条件进行判断是否为回文子串
 *  （1）长度为1，一定回文
 *  （2）长度为2或3，判断首尾是否相同
 *  （3）长度大于3，首尾字符相同，且去掉首尾之后的子串仍未回文
 * 
 * @param { string } s
 * @returns { string }
 */
function longestPalindrome(s) {
  const dp = []

  for (let i = 0; i < s.length; i++) {
    dp[i] = []
  }

  let max = -1,
    str = '';

  for (let l = 0; l < s.length; l++) { // l 为所遍历的子串长度 - 1， 即左下标到到右下标的长度
    for (let i = 0; i + l < s.length; i++) {
      const j = i + l

      if (l === 0) {
        dp[i][j] = true
      } else if (l <= 2) { // 长度为2或3时，首尾字符相同则是回文子串
        dp[i][j] = s[i] === s[j]
      } else { // 长度大于 3
        dp[i][j] = s[i] === s[j] && dp[i + 1][j - 1]; // 长度大于3时，若首尾字符串相同且去掉首尾之后子串仍为回文，则为回文子串
      }

      if (dp[i][j] && l > max) {
        max = l
        str = s.substring(i, j + 1)
      }
    }
  }
  return str
}

console.log(longestPalindrome('adddaa'))
/**
 * 方法二：中心扩展
 * 思路：回文子串一定是对称的，所以我们每次可以选择一个中心，然后由中心到两边判断左右字符是否相等。
 * 中心点的选择有两种情况：当长度为奇数是以单个字符为中心，当长度为偶数时以两个字符中间的
 * 空隙为中心。
 * 详解：
 * 1. 循环遍历字符串取得不同的长度的子串
 * 2. 通过定义好的中心扩展方法，选取奇数对称和偶数对称的中心
 * 3. 通过比较选择出两种组合较大的回文子串长度，然后对比之前的长度，判断是否更新起止位置
 * 4. 全部遍历完成后，根据最后的起止位置的值，截取最长回文子串
 * @param { string } s
 * @returns { string }
 */
function longestPalindrome2(s) {
  if (s == null || s.length < 1) {
    return ''
  }

  let start = 0,
    end = 0;
  
  // 从中心向两边扩展
  const expendFromCenter = (s, left, right) => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left -= 1
      right += 1
    }
    return right - left - 1
  }

  for (let i = 0; i < s.length; i++) {
    // 中心的两种选取（奇数对称和偶数对称）
    const len1 = expendFromCenter(s, i, i)
    const len2 = expendFromCenter(s, i, i + 1)
    // 两种组合取最大的回文字符串长度
    const lenMax = Math.max(len1, len2)

    // 如果此位置为中心的回文长度大于之前的长度，则进行处理
    if (lenMax > end - start) {
      start = i - Math.floor((lenMax - 1) / 2)
      end = i + Math.floor(lenMax / 2)
    }
  }
  return s.substring(start, end + 1)
}

console.log(longestPalindrome2('aaddaasdf'))

console.log('--------------- 最长回文子串 end ---------------')

console.timeEnd('chapter-1')


