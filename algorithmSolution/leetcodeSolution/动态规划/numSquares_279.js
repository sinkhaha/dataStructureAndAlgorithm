/**
 * 279. 完全平方数
 * 中等
 * https://leetcode.cn/problems/perfect-squares/
 * 
 * 解法：动态规划
 * 
 * 时间O(n*sqrt(n))，sqrt 为平方根 
 * 空间O(n)
 */
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {

    // dp[i]表示完全平方数和为i的最小个数(dp长度为n+1)
    // 初始化：dp[0] = 0; dp[i] = i，dp[i]最坏情况等于i，即i个1相加
    // dp方程：dp[i] = min(dp[i], dp[i-j*j]+1) 其中, j是平方数, j=1~k, k*k<= i

    // 完全平方数和为i的最小个数(新dp[i])=当前完全平方数和为i的最大个数(旧dp[i]) + 完全平方数和为(i - j * j )的最小个数dp[i - j * j ] + 完全平方数和为 j * j的 最小个数(由于dp[j*j]=1,所以为1)


    let dp = new Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        dp[i] = i;
        for (let j = 1; i - j * j >= 0; j++) {
            dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
        }
    }
    return dp[n];

};