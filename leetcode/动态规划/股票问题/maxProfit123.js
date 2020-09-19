/**
 * 188. 买卖股票的最佳时机 IV
 * 困难
 * 
 * 动态规划
 * 
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let n = prices.length;
    if (n === 0) {
        return 0;
    }

    // 最多进行两次交易
    let maxK = 2;
    let dp = [];
    // 3维dp数组 [n][maxK+1][2];
    for (let i = 0; i < n; i++) {
        dp[i] = [];
        for (let j = 0; j < maxK + 1; j++) {
            dp[i][j] = [];
            for (let k = 0; k < 2; k++) {
                dp[i][j][k] = 0;
            }
        }
    }

    console.log(dp);

    for (let i = 0; i < n; i++) {
        for (let k = maxK; k >= 1; k--) {
            if (i - 1 == -1) {
                // 处理 base case
                dp[-1][k][0] = dp[i][0][0] = 0;
                dp[-1][k][1] = dp[i][0][1] = -Number.MIN_VALUE;
            }
            dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i]);
            dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i]);
        }
    }

    // 穷举了 n × maxK × 2 个状态，正确。
    return dp[n - 1][maxK][0];
};

const prices = [3, 3, 5, 0, 0, 3, 1, 4];
// console.log(maxProfit(prices));

var maxProfit2 = function (prices) {
    let n = prices.length;
    if (n === 0) {
        return 0;
    }

    let dp_i10 = 0;
    let dp_i11 = Number.MIN_VALUE;
    let dp_i20 = 0
    let dp_i21 = Number.MIN_VALUE;

    for (let price of prices) {
        dp_i20 = Math.max(dp_i20, dp_i21 + price);
        dp_i21 = Math.max(dp_i21, dp_i10 - price);
        dp_i10 = Math.max(dp_i10, dp_i11 + price);
        dp_i11 = Math.max(dp_i11, -price);
    }
    return dp_i20;
}

const prices2 = [1, 2, 3, 4, 5];
console.log(maxProfit2(prices2));
