/**
 *  爬楼梯：每次可以爬一阶或两阶，问到达顶层有多少种不同的方法。
 */
function climbStairs(n = 0) {
  if (n <= 1) {
    return 1;
  }

  const dp = new Array(n + 1).fill(0);

  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}


/**
 * 节省空间
 */
function climbStairs2(n) {
  if (n <= 2) return n; // 边界条件：1阶和2阶

  let prev2 = 1, prev1 = 2; // 初始值：dp[1] = 1, dp[2] = 2
  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2; // dp[i] = dp[i-1] + dp[i-2]
    prev2 = prev1; // 更新前两项
    prev1 = curr;
  }

  return prev1; // 返回最终值
}


