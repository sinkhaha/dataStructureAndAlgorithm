## 题目
**123. 买卖股票的最佳时机 III**
>困难

https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/

## 解法
### 思路
参考第188题，当k为2时的结果

### 代码
```javascript
/**
 * 
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit1 = function (prices) {
    let n = prices.length;
    if (n === 0) {
        return 0;
    }

    // 最多进行两次交易
    let maxK = 2;
    let dp = [];
    // 初始化3维dp数组为0， [0...n][0..maxK][2]
    for (let i = 0; i < n; i++) {
        dp[i] = [];
        for (let k = 0; k < maxK + 1; k++) {
            dp[i][k] = [];
            dp[i][k][0] = 0;
            dp[i][k][1] = 0;
        }
    }

    for (let i = 0; i < n; i++) {
        for (let k = maxK; k >= 1; k--) {
            // base case
            if (i - 1 == -1) {
                dp[i][k][0] = 0;
                dp[i][k][1] = Number.MIN_SAFE_INTEGER;
                continue;
            }
            // 今天没有持有股票， max(无操作，卖出)
            dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i]);
            // 今天有持有股票，max(无操作，买入)
            dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i]);
        }
    }

    // 穷举了 n × maxK × 2 个状态
    return dp[n - 1][maxK][0];
};

```

```javascript
/**
 * @param {*} prices 
 */
var maxProfit2 = function (prices) {
    let n = prices.length;
    if (n == 0) {
        return 0;
    }

    // 初始化数组
    let dp = [];
    for (let i = 0; i < n; i++) {
        dp[i] = [];
        for (let k = 0; k <= 2; k++) { // 2为最多2次交易
            dp[i][k] = [];
            dp[i][k][0] = 0;
            dp[i][k][1] = 0;
        }
    }

    // 第1天共0次交易的利润
    dp[0][0][0] = 0;
    dp[0][0][1] = -prices[0];
    // 第1天共1次交易的利润
    dp[0][1][0] = dp[0][1][1] = Number.MIN_SAFE_INTEGER;
    // 第1天共2次交易的利润
    dp[0][2][0] = dp[0][2][1] = Number.MIN_SAFE_INTEGER;

    // 第1天已经初始化，所以从i是1开始，表示第2天
    for (let i = 1; i < n; i++) {
        // 0次交易
        dp[i][0][0] = dp[i - 1][0][0];
        // max(不操作，买入)
        dp[i][0][1] = Math.max(dp[i - 1][0][1], dp[i - 1][0][0] - prices[i]);

        // 1次交易
        dp[i][1][0] = Math.max(dp[i - 1][1][0], dp[i - 1][0][1] + prices[i]);
        dp[i][1][1] = Math.max(dp[i - 1][1][1], dp[i - 1][1][0] - prices[i]);

        // 2次交易
        dp[i][2][0] = Math.max(dp[i - 1][2][0], dp[i - 1][1][1] + prices[i]);
    }

    let end = n - 1;
    return Math.max(dp[end][0][0], dp[end][1][0], dp[end][2][0]);
}

```
```javascript
/**
 * 状态压缩
 * @param {*} prices 
 */
var maxProfit3 = function (prices) {
    let n = prices.length;
    if (n === 0) {
        return 0;
    }

    let dp_i10 = 0; // 买了第1个股票又卖了
    let dp_i11 = Number.MIN_SAFE_INTEGER; // 买了第1个股票，此时还没卖
    let dp_i20 = 0; // 卖了第2个股票
    let dp_i21 = Number.MIN_SAFE_INTEGER; // 第2个股票买进来还没有卖

    for (let price of prices) {
        dp_i20 = Math.max(dp_i20, dp_i21 + price);
        dp_i21 = Math.max(dp_i21, dp_i10 - price);
        dp_i10 = Math.max(dp_i10, dp_i11 + price);
        dp_i11 = Math.max(dp_i11, -price);
    }
    return dp_i20;
}

```
