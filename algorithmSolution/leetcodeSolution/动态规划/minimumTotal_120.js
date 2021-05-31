/**
 * 120 三角形最小路径和
 * 
 * 中等
 * https://leetcode-cn.com/problems/triangle/
 */
/**
 * 
 * 动态规划解法
 * 
 * 
 * (1)dp定义
 * 从最后一行往上推
 * dp[i][j]表示从最底一层到(i,j)这个点的所有路径和的最小值
 * 
 * 所求结果即dp[0][0]
 * 
 * (2)状态转移方程
 * dp[i][j] = min(dp[i+1][j], dp[i+1][j+1]) + triangle[i][j] // 相邻节点的较小者
 * 
 * (3)base case
 * 即最底层每个节点的最小和都等于自己
 * dp[n-1][j]= triangle[n-1][j]
 * 
 * 时间复杂度O(m*n) m为行，n为列
 * 空间复杂度O(m*n)
 * 
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
    if (!triangle || triangle.length == 0) {
        return 0;
    }

    const m = triangle.length;
    const n = triangle[triangle.length - 1].length;

    // 初始化数组为0
    const dp = [];
    for (let i = 0; i < m; i++) {
        dp[i] = [];
        for (let j = 0; j < n; j++) {
            if (i == m - 1) { // base case
                dp[i][j] = triangle[i][j];
            } else {
                dp[i][j] = 0;
            }
        }
    }
    console.log('dp=', dp);

    // 从后往前，从下往上遍历
    for (let i = m - 2; i >= 0; i--) {
        for (let j = n - 2; j >= 0; j--) {
            dp[i][j] = Math.min(dp[i + 1][j], dp[i + 1][j + 1]) + triangle[i][j];
        }
    }

    return dp[0][0];
};

const triangle = [
    [2],
    [3, 4],
    [6, 5, 7],
    [4, 1, 8, 3]
];
console.log(minimumTotal(triangle)); // 2+3+5+1=11
