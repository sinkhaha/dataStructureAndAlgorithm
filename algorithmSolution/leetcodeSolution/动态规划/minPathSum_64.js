/**
 * 64. 最小路径和
 * 中等
 * https://leetcode.cn/problems/minimum-path-sum/
 * 
 * 解法：动态规划
 * 
 * 时间O(mn) 
 * 空间O(mn)
 */
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
    // 
    // dp[i][j]表示到(i,j)总和最小
    // dp[0][0] = grid[0][0], dp[0][j] = grid[0][0] +...+ grid[0][j] ,dp[i][0] = grid[0][0] +...+ grid[i][0]
    // dp[i][j] = min(dp[i][j-1] + grid[i][j], dp[i-1][j] + grid[i][j]) 

    if (!grid || !grid.length) {
        return 0;
    }

    const dp = [];

    let m = grid.length;
    let n = grid[0].length;

    // 实例化dp数组 和 base case
    for (let i = 0; i < m; i++) {
        dp[i] = [];
        for (let j = 0; j < n; j++) {
            if (i == 0 && j == 0) {
                dp[i][j] = grid[0][0];
            } else if (i === 0) {
                for (let k = 0; k < j; k++) {
                    dp[i][j] = dp[i][k] + grid[i][j];
                }
            } else if (j === 0) {
                for (let k = 0; k < i; k++) {
                    dp[i][j] = dp[k][j] + grid[i][j];
                }
            } else {
                dp[i][j] = 0;
            }
        }
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = Math.min(dp[i][j - 1] + grid[i][j], dp[i - 1][j] + grid[i][j])
        }
    }

    return dp[m - 1][n - 1];
};