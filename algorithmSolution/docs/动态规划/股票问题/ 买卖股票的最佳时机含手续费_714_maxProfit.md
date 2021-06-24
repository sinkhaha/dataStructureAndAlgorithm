## 题目
**714. 买卖股票的最佳时机含手续费**
>中等

https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/

## 解法：动态规划
### 思路
跟122、309的解法类似。
  
每次交易要支付手续费，只要把手续费从利润中减去即可。

状态转移方程：
`dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])`
`dp[i][1] = max(dp[i-1][1], dp[i-1][0] - prices[i] - fee)`
解释：相当于买入股票的价格升高了;在第一个式子里减fee也是一样的，相当于卖出股票的价格减小了

### 代码
```javascript
/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function(prices, fee) {
    let n = prices.length;
    let dp_i_0 = 0, dp_i_1 = Number.MIN_SAFE_INTEGER;

    for (let i = 0; i < n; i++) {
        let temp = dp_i_0;
        dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
        dp_i_1 = Math.max(dp_i_1, temp - prices[i] - fee);
    }
    return dp_i_0;
};
const prices = [1, 3, 2, 8, 4, 9], fee = 2;
console.log(maxProfit(prices, fee)); // 8

```
### 复杂度
* 时间复杂度O(n)
* 空间复杂度O(1)