/**
 * 188 买卖股票的最佳时机 IV （k次交易）
 * 
 * 困难
 * 
 * 当k等于1时，是121题
 * 当k等于 无限 时，是122题
 * 当k等于2时，是123题
 * 
 * 动态规划解法：
 * （1）dp数组定义，3维数组
 * dp[i][k][j]: 到第i天的最大利润,0<=i<=n-1, 
 * j为0或1，表示是否持有股票，0表示没有股票，1表示有股票，j为0时我能买，不能卖；为1时我能卖，不能买。
 * k表示之前总共交易了多少次 1<=k<=K
 * 
 * 所求结果为第n-1天没有持股票时，第0到K天的最大值
 * max(dp[n - 1]{1...K}[0])
 * 
 * （2）状态转移方程
 * 两层循环
 * for(i : 0 -> n-1) 
 *   for (k: 1 -> k)
 * 
 * 第i天没有股票：
 * dp[i][k][0] = Max(dp[i-1][k][0], dp[i-1][k-1][1] + prices[i])
 * 前一天没股票，今天不操作：dp[i-1][k][0]即第i-1天也没有股票，所以第i天不操作
 * 前一天有股票，今天卖：dp[i-1][k-1][1] + prices[i]即第i-1天有股票，在第i天卖了，得到利润prices[i]
 * 
 * 第i天有股票：
 * dp[i][k][1] = Max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])
 * 前一天有股票，今天不操作：dp[i-1][k][1]即第i-1天有股票，所以第i天不操作
 * 前一天没股票，今天买：dp[i-1][k-1][0]-prices[i]即第i-1天没股票，在第i天买入，要减去prices[i]的价格
 * 
 * （3）base case:
 * dp[-1][k][0]= 0 ；因为i是从0开始，-1表示还没开始，所以此时利润为0
 * dp[-1][k][1] = -infinity ；因为i是从0开始，-1表示还没开始，所以是不可能持有股票的，用负无穷表示这种不可能
 * dp[i][0][0] = 0 ； 因为 k 是从 1 开始的，所以 k = 0 表示不允许交易，此时利润是 0
 * dp[i][0][1] = -infinity ；因为k=0表示不允许交易，是不可能持有股票的，用负无穷表示这种不可能
 * 即
 * dp[-1][k][0] = dp[i][0][0] = 0
 * dp[-1][k][1] = dp[i][0][1] = -infinity
 * 
 * 时间复杂度O(n*K)
 * 空间复杂度O(n*K)
 * 
 */

/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (k, prices) {

};
// TODO

const k = 2, prices = [2, 4, 1];
console.log(maxProfit(k, prices));

/**======================================================= */
/**
 * 当k=1时，即121题的dp解法
 *
 * 状态转移方程：
 * dp[i][1][0] = Max(dp[i-1][1][0], dp[i-1][0][1] + prices[i])
 * dp[i][1][1] = Max(dp[i-1][1][1], dp[i-1][0][0] - prices[i])
 * 
 * 根据base case，当k=0时，dp[i-1][0][0]=0所以
 * dp[i][1][0] = Max(dp[i-1][1][0], dp[i-1][0][1] + prices[i])
 * dp[i][1][1] = Max(dp[i-1][1][1], -prices[i])
 * 
 * 因为k固定为1，所以可以简化为
 * dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])
 * dp[i][1] = max(dp[i-1][1], -prices[i])
 * 
 */
var maxProfit121 = function (prices) {
    let n = prices.length;
    if (n == 0) {
        return 0;
    }
    // [[0, 0], [0, 0]......]
    let dp = Array(n).fill([0, 0]);

    console.log('dp是', dp);

    for (let i = 0; i < n; i++) {
        // base case处理， i = 0 时 dp[i-1] 是不合法的
        if (i - 1 == -1) {
            dp[i][0] = 0; //  dp[i][0] = max(dp[-1][0], dp[-1][1] + prices[i]) = max(0, -infinity + prices[i]) = 0
            dp[i][1] = -prices[i]; //  dp[i][1] = max(dp[-1][1], dp[-1][0] - prices[i]) = max(-infinity, 0 - prices[i]) = -prices[i]
            continue;
        }
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
        dp[i][1] = Math.max(dp[i - 1][1], -prices[i]);
    }

    return dp[n - 1][0];
}

console.log(maxProfit121([7, 1, 5, 3, 6, 4])); // 5

/**
 * 在原基础上状态压缩
 * 
 * 新状态只和相邻的一个状态有关，不用整个 dp 数组，只需要一个变量储存相邻的那个状态即可，可以把空间复杂度降到 O(1)
 * 
 * @param {*} prices 
 */
var maxProfit121_2 = function (prices) {
    let n = prices.length;
    if (n == 0) {
        return 0;
    }

    // base case: dp[-1][0] = 0, dp[-1][1] = -infinity
    let dp_i_0 = 0, dp_i_1 = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < n; i++) {
        // dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])
        dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
        // dp[i][1] = max(dp[i-1][1], -prices[i])
        dp_i_1 = Math.max(dp_i_1, -prices[i]);
    }
    return dp_i_0;
}

console.log(maxProfit121_2([7, 1, 5, 3, 6, 4])); // 5

/**===========================k等于2，即123题的解法============================ */