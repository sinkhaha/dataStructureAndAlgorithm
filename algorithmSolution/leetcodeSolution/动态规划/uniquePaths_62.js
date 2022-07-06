/**
 * 62. 不同路径
 * 中等
 * https://leetcode.cn/problems/unique-paths/
 * 
 * 解法：动态规划
 * 
 * 时间O(mn) 
 * 空间O(mn)
 */
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
    // 
    // dp[i][j]表示走到(i,j)下标的位置的总路径数
    // case： dp[0][0]为1，因为只能向右和向下，所以dp[0][j]都为1，dp[1][0]也都为1
    // (i，j)位置的总路径数，可以为其左边的总路径数 + 其上边的总路径数，即状态转移方程 dp[i][j] = dp[i-1][j] + dp[i][j-1]
    // 所求结果即为dp[m-1][n-1]

    // 初始化数组
    let dp = [];
    for (let i = 0; i < m; i++) {
        dp[i] = [];
        for (let j = 0; j < n; j++) {
            if (i === 0) {
                dp[i][j] = 1;
            } else if (j === 0) {
                dp[i][j] = 1;
            } else {
                dp[i][j] = 0;
            }
        }
    }

    // 状态转移
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }

    return dp[m - 1][n - 1];
};