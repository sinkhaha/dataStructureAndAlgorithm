/**
 * 剑指 Offer II 099. 最小路径之和
 * 中等
 * https://leetcode.cn/problems/0i0mDW/
 * 
 * 解法：动态规划
 * 
 * 时间O(mn) 
 * 空间O(mn)
 * 
 */
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
    // 只能向右 或 向下

    // dp[i][j] 表示从左上角出发到 (i,j)位置的最小路径和
    // dp[0][0]=grid[0][0]

    // 状态转移方程
    // 当i>0 且 j=0 时，dp[i][0] = dp[i−1][0] + grid[i][0]
    // 当i=0 且 j>0 时，dp[0][j] = dp[0][j−1] + grid[0][j]
    // 当 i>0 且 j>0 时，dp[i][j] = min(dp[i−1][j], dp[i][j−1]) + grid[i][j]

    // dp[m−1][n−1] 的值即为从网格左上角到网格右下角的最小路径和

    if (grid == null || grid.length == 0 || grid[0].length == 0) {
        return 0;
    }

    let rows = grid.length;
    let columns = grid[0].length;

    let dp = Array.from(new Array(rows), () => new Array(columns).fill(0));
    dp[0][0] = grid[0][0];

    // 第1行
    for (let i = 1; i < rows; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0];
    }

    // 第1列
    for (let j = 1; j < columns; j++) {
        dp[0][j] = dp[0][j - 1] + grid[0][j];
    }

    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < columns; j++) {
            dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
        }
    }

    return dp[rows - 1][columns - 1];
};