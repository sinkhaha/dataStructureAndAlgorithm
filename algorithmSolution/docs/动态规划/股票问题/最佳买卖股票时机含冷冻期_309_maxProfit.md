## 题目
**309. 最佳买卖股票时机含冷冻期**
>中等

https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/

## 解法：动态规划
### 思路
每次 sell卖出 之后要等一天才能继续交易(跟122的动态规划解法类似)

状态转移方程：
`dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])`
`dp[i][1] = max(dp[i-1][1], dp[i-2][0] - prices[i])`
第 i 天选择买入的时候，要从 i-2 的状态转移，而不是 i-1

### 代码
```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let n = prices.length;
    let dp_i_0 = 0, dp_i_1 = Number.MIN_SAFE_INTEGER;
    let dp_pre_0 = 0; // 代表 dp[i-2][0]

    for (let i = 0; i < n; i++) {
        let temp = dp_i_0;
        dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
        dp_i_1 = Math.max(dp_i_1, dp_pre_0 - prices[i]);
        dp_pre_0 = temp;
    }

    return dp_i_0;
};
```
### 复杂度
* 时间复杂度 O(n)
* 空间复杂度 O(1)