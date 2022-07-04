/**
 * 剑指 Offer II 091. 粉刷房子
 * 中等
 * https://leetcode.cn/problems/JEj789/
 * 
 * 解法：动态规划
 */
/**
 * @param {number[][]} costs
 * @return {number}
 */
var minCost = function (costs) {
    // 相邻房子颜色不同
    // 要求刷第i个的成本最小，可由刷第i-1个的成本最小得出

    // dp[i][j] i表示第几号房子，j表示刷的颜色，所以表示从0号房子刷到第i号房子，且第i号房子刷成j这个颜色时的花费最小
    // 只有3种颜色，所以0 <= j < 3 
    // dp[0][j] = costs[0][j] 刷第0号房子时，无论刷哪种颜色，总花费等于该颜色的费用成本

    // 当 1 <= i < n，第i号和第i-1号房子的颜色必不相同，因此当第 i 号房子被粉刷成某一种颜色时，第i−1 号房子只能被粉刷成另外两种颜色之一。所以当第i号房子被分别刷成3种颜色时，刷第0号到第1号房子的最小花费成本如下
    // dp[i][0] = min(dp[i-1][1], dp[i-1][2]) + costs[i][0]
    // dp[i][1] = min(dp[i-1][0], dp[i-1][2]) + costs[i][1]
    // dp[i][2] = min(dp[i-1][0], dp[i-1][1]) + costs[i][2]
    // 以上可以合并为一个状态转移方程
    // 当 1 <= i < n 且 0 <= j < 3时，转移方程如下
    // dp[i][j] = min(dp[i−1][(j+1) mod 3], dp[i−1][(j+2) mod 3]) + costs[i][j]
    // 最后 dp[n−1] 中的最小值即为粉刷所有房子的最小花费成本

    // 当 i≥1 时，由于dp[i] 的计算只和dp[i−1] 有关，因此可以使用滚动数组优化空间，将空间复杂度降低到O(1)。

    // 时间O(n) 空间O(1)

    const n = costs.length;

    let dp = new Array(3).fill(0);
    for (let j = 0; j < 3; j++) {
        dp[j] = costs[0][j];
    }

    for (let i = 1; i < n; i++) {
        const dpNew = new Array(3).fill(0);

        for (let j = 0; j < 3; j++) {
            dpNew[j] = Math.min(dp[(j + 1) % 3], dp[(j + 2) % 3]) + costs[i][j];
        }

        dp = dpNew;
    }

    return parseInt(_.min(dp));
};