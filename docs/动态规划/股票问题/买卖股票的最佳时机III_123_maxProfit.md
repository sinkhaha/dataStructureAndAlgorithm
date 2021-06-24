## 题目
**123. 买卖股票的最佳时机 III**
>困难


给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。

注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

 

示例 1:
```
输入：prices = [3,3,5,0,0,3,1,4]
输出：6
解释：在第 4 天（股票价格 = 0）的时候买入，在第 6 天（股票价格 = 3）的时候卖出，这笔交易所能获得利润 = 3-0 = 3 。
     随后，在第 7 天（股票价格 = 1）的时候买入，在第 8 天 （股票价格 = 4）的时候卖出，这笔交易所能获得利润 = 4-1 = 3 。
```     
示例 2：
```
输入：prices = [1,2,3,4,5]
输出：4
解释：在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。   
     注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。   
     因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
```     
示例 3：
```
输入：prices = [7,6,4,3,1] 
输出：0 
解释：在这个情况下, 没有交易完成, 所以最大利润为 0。
```
示例 4：
```
输入：prices = [1]
输出：0
``` 

提示：

* 1 <= prices.length <= 10^5
* 0 <= prices[i] <= 10^5

> https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/
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