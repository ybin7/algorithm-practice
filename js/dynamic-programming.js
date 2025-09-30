/**
 * 最大子序列和
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组(子数组最少包含一个元素)，返回 其最大和。
 * 输入：[-2,1,-3,4,-1,2,1,-5,4]
 * 输出：6
 * 连续子数组 [4, -1, 2, 1]
 */

/**
 * 暴力拆解
 * @param { number[] } nums
 * @returns { number }
 */
function maxSubArr(nums) {
  let sum = 0;
  let maxNumber = 0;

  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      sum = 0;
      for (let k = i; k <= j; k++) {
        sum += nums[k]
      }
      if (sum > maxNumber) {
        maxNumber = sum
      }
    }
  }

  return maxNumber
}

/**
 * 动态规划解法
 * @param { number[] } nums
 * @param { number }
 */
function maxNumber2(nums) {
  let maxNumber = nums[0]
  let middleNum = nums[0]

  for (let i = 1; i < nums.length; i++) {
    if (middleNum > 0) {
      middleNum += nums[i]
    } else {
      middleNum = nums[i]
    }
    if (maxNumber < middleNum) {
      maxNumber = middleNum
    }
    console.log({ middleNum, maxNumber })
  }

  return maxNumber
}

const numsArr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
console.time()
console.log(maxNumber2(numsArr))
console.timeEnd()
