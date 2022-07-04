/**
 * 剑指 Offer II 098. 路径的数目
 * 中等
 * https://leetcode.cn/problems/2AoeFn/
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
    //  f(i, j) 表示从左上角走到(i,j) 的路径数量，其中 i 和 j 的范围分别是 [0,m) 和 [0,n)

    // 每一步只能从向下 或 向右移动一步，如果向下走一步，那么会从 (i-1, j) 走过来；如果向右走一步，那么会从 (i, j-1) 走过来，所以状态转移方程
    // f(i,j) = f(i−1,j) + f(i,j−1)

    // 如果 i=0，那么 f(i-1,j) 并不是一个满足要求的状态，需要忽略这一项；同理，如果 j=0，那么 f(i,j-1)并不是一个满足要求的状态，需要忽略这一项

    // 初始条件为 f(0,0)=1，即从左上角走到左上角有一种方法

    // 最终的答案即为 f(m-1,n-1)

    const f = new Array(m).fill(0).map(() => new Array(n).fill(0));
    for (let i = 0; i < m; i++) {
        f[i][0] = 1;
    }
    for (let j = 0; j < n; j++) {
        f[0][j] = 1;
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            f[i][j] = f[i - 1][j] + f[i][j - 1];
        }
    }
    return f[m - 1][n - 1];
};