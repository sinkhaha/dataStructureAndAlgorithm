/**
 * 123. 买卖股票的最佳时机 III （2次交易） 
 * 
 * 困难
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
        for (let k = 0; k <= maxK; k++) {
            dp[i][k] = [];
            for (let s = 0; s < 2; s++) {
                dp[i][k][s] = 0;
            }
        }
    }

    console.log('dp是：', dp);

    dp[0][0][0] = 0;
    dp[0][0][1] = -prices[0];
    dp[0][1][0] = dp[0][1][1] = Number.MIN_SAFE_INTEGER;
    dp[0][2][0] = dp[0][2][1] = Number.MIN_SAFE_INTEGER;

    for (let i = 0; i < n; i++) {
        for (let k = maxK; k >= 1; k--) {
            // base case
            if (i - 1 == -1) {
                dp[i][k][0] = 0
                dp[i][k][1] = Number.MIN_SAFE_INTEGER;
                continue;
            }
            // 今天没有持有股票， max(无操作，卖出)
            dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i]);
            // 今天有持有股票，max(无操作，买入)
            dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i]);
        }
    }

    console.log(dp);

    // 穷举了 n × maxK × 2 个状态，正确
    return dp[n - 1][maxK][0];
};

const prices = [3, 3, 5, 0, 0, 3, 1, 4];
console.log(maxProfit(prices)); // 6

var maxProfit2 = function (prices) {
    let n = prices.length;
    if (n === 0) {
        return 0;
    }

    let dp_i10 = 0;
    let dp_i11 = Number.MIN_SAFE_INTEGER;
    let dp_i20 = 0
    let dp_i21 = Number.MIN_SAFE_INTEGER;

    for (let price of prices) {
        dp_i20 = Math.max(dp_i20, dp_i21 + price);
        dp_i21 = Math.max(dp_i21, dp_i10 - price);
        dp_i10 = Math.max(dp_i10, dp_i11 + price);
        dp_i11 = Math.max(dp_i11, -price);
    }
    return dp_i20;
}

const prices2 = [1, 2, 3, 4, 5];
console.log(maxProfit2(prices2)); // 4

/**
 * @param {*} prices 
 */
var maxProfit3 = function (prices) {
    let n = prices.length;
    if (n == 0) {
        return 0;
    }

    // 初始化数组
    let dp = [];
    for (let i = 0; i < n; i++) {
        dp[i] = [];
        for (let k = 0; k <= 2; k++) {
            dp[i][k] = [];
            dp[i][k][0] = 0;
            dp[i][k][1] = 0;
        }
    }
    console.log('dp=', dp);

    dp[0][0][0] = 0;
    dp[0][0][1] = -prices[0];
    dp[0][1][0] = dp[0][1][1] = Number.MIN_SAFE_INTEGER;
    dp[0][2][0] = dp[0][2][1] = Number.MIN_SAFE_INTEGER;

    for (let i = 1; i < n; i++) {
        dp[i][0][0] = dp[i - 1][0][0];
        dp[i][0][1] = Math.max(dp[i - 1][0][1], dp[i - 1][0][0] - prices[i]);

        dp[i][1][0] = Math.max(dp[i - 1][1][0], dp[i - 1][0][1] + prices[i]);
        dp[i][1][1] = Math.max(dp[i - 1][1][1], dp[i - 1][1][0] - prices[i]);

        dp[i][2][0] = Math.max(dp[i - 1][2][0], dp[i - 1][1][1] + prices[i]);

    }
    let end = n - 1;
    return Math.max(dp[end][0][0], dp[end][1][0], dp[end][2][0]);
}

console.log(maxProfit3([1, 2, 3, 4, 5])); // 4
