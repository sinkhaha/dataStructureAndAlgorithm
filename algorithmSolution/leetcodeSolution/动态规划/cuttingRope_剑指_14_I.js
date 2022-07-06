/**
 * 剑指 Offer 14- I. 剪绳子
 * 中等
 * https://leetcode.cn/problems/jian-sheng-zi-lcof/
 * 
 * 解法：动态规划
 * 动态规划 参考https://leetcode.cn/problems/jian-sheng-zi-lcof/solution/by-nehzil-w61p/
 * 
 * 时间O(n) 
 * 空间O(n)
 */
/**
 * @param {number} n
 * @return {number}
 */
var cuttingRope = function (n) {
    // dp[i]表示把长度为i绳子剪成至少2段后，绳子的最大乘积
    // 当i>=2时，第1段减的长度是j，如果第2段不剪，那乘积dp[i]=j * (i - j)；如果第2段继续剪，那乘积为dp[i]=j * dp[i-j]，所以状态转移方程为dp[i] = max(dp[i], max(j*(i-j), j*dp[i-j]))， j >= 1
    // base case，绳子长为0和1时，没法剪成2段，所以dp[0]=0,dp[1]=0
    if (n <= 1) {
        return 0;
    }

    const dp = Array(n + 1).fill(0);
    dp[2] = 1;

    for (let i = 3; i <= n; i++) { // i要等于n，因为绳子最长是n
        for (let j = 1; j < i; j++) { // 注意j < i，因为假设第1段是1，那第2段最多只能是i - 1
            dp[i] = Math.max(dp[i], Math.max(j * (i - j), j * dp[i - j]));
        }
    }

    return dp[n];
};