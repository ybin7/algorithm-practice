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
function climbStairs2(n = 0) {
  if (n <= 1) {
    return 1;
  }

  let a = 1;
  let b = 1;

  for (let i = 2; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }

  return b;
}

