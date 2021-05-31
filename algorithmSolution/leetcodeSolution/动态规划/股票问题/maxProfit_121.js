/**
 * 121. 买卖股票的最佳时机 （1次交易）
 * 简单
 * 
 * 思路：
 * 可以在历史最低点买的股票，记录一个历史最低价格点 minprice，
 * 在第 i 天卖出股票能得到的利润就是 prices[i] - minprice
 *  (即 数组中最高的 - 最低的 = 利润最大的)
 *
 * 解法：
 * 只需要遍历价格数组一遍，判断当前值是否是记录历史最低价格点，
 * 如果当前值比最低点大，重新计算是否是最大利润 
 * 
 * 时间复杂度O(n),n为prices的长度
 * 空间复杂度O(1)
 * 
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit1 = function (prices) {
    if (prices.length === 0) {
        return 0;
    }
    // 最低点
    let minPrice = Number.MAX_SAFE_INTEGER;
    // 最大利润
    let maxProfit = 0;
    for (let i = 0; i < prices.length; i++) {
        // 判断当前是否是最低价格点
        if (prices[i] < minPrice) {
            minPrice = prices[i];
            // 当前值比最低点大，重新计算是否是最大利润    
        } else if (prices[i] - minPrice > maxProfit) {
            maxProfit = prices[i] - minPrice;
        }
    }
    return maxProfit;
};

const prices = [7, 1, 5, 3, 6, 4];
console.log(maxProfit1(prices)); // 5


/**
 * 动态规划的解法
 *
 * 状态转移方程：
 * dp[i][1][0] = Max(dp[i-1][1][0], dp[i-1][1][1] + prices[i])
 * dp[i][1][1] = Max(dp[i-1][1][1], dp[i-1][0][0] - prices[i])
 * 
 * 根据base case，当k=0时，dp[i-1][0][0]=0所以
 * dp[i][1][0] = Max(dp[i-1][1][0], dp[i-1][1][1] + prices[i])
 * dp[i][1][1] = Max(dp[i-1][1][1], -prices[i])
 * 
 * 因为k固定为1，所以可以简化为
 * dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])
 * dp[i][1] = max(dp[i-1][1], -prices[i])
 * 
 * 时间复杂度O(n)
 * 空间复杂度O(n)
 */
var maxProfit2 = function (prices) {
    let n = prices.length;
    if (n == 0) {
        return 0;
    }
    // [[0, 0], [0, 0]......]
    let dp = Array(n).fill([0, 0]);

    // console.log('dp是', dp);

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

console.log(maxProfit2([7, 1, 5, 3, 6, 4])); // 5

/**
 * 在原基础上状态压缩
 * 
 * 新状态只和相邻的一个状态有关，不用整个 dp 数组，只需要一个变量储存相邻的那个状态即可，可以把空间复杂度降到 O(1)
 * 
 * 时间复杂度O(n)
 * 空间复杂度O(1)
 * 
 * @param {*} prices 
 */
var maxProfit3 = function (prices) {
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

console.log(maxProfit3([7, 1, 5, 3, 6, 4])); // 5
