/**
 * 221. 最大正方形
 * 中等
 * https://leetcode.cn/problems/maximal-square/
 * 
 * 解法：动态规划
 * 参考官方题解
 * 
 * 时间O(mn)
 * 空间O(mn)
 */
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
    //  
    // 1、dp[i][j]表示以(i, j)为正方形右下角，且只包含1的正方形的“边长最大值”
    // 如果能计算出所有dp(i,j) 的值，那么其中的最大值即为矩阵中只包含1的正方形的边长最大值，其平方即为最大正方形的面积。

    // 2、
    // 如果(i, j)位置的值为0，则dp[i][j] = 0，因为当前位置不可能在由 1 组成的正方形中
    // 如果(i, j)位置的值为1，则dp[i][j]的值由其上方、左方和左上方的三个相邻位置的dp值决定,具体而言，当前位置的元素值等于三个相邻位置的元素中的最小值加 1，状态转移方程如下：
    // 状态转移方程：dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;（当前节点向上、向左、向左上方找到最小的状态值(因为要构成正方形)，然后加1就是当前状态值

    // 3、base case
    // 还需要考虑边界条件，如果i和j中至少有一个为 0，则以位置 (i,j) 为右下角的最大正方形的边长只能是 1，因此 dp[i][j]=1。

    let maxSide = 0;
    if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
        return maxSide;
    }

    let rows = matrix.length;
    let columns = matrix[0].length;

    let dp = Array.from(new Array(rows), () => new Array(columns).fill(0));

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (matrix[i][j] == '1') {
                if (i == 0 || j == 0) {
                    dp[i][j] = 1;
                } else {
                    dp[i][j] = Math.min(Math.min(dp[i - 1][j], dp[i][j - 1]), dp[i - 1][j - 1]) + 1
                }
                maxSide = Math.max(maxSide, dp[i][j]);
            }
        }
    }

    let maxSquare = maxSide * maxSide;
    return maxSquare;
};