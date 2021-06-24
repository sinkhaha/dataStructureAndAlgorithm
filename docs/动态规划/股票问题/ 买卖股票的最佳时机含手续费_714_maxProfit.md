## 题目
**714. 买卖股票的最佳时机含手续费**
>中等

给定一个整数数组 prices，其中第 i 个元素代表了第 i 天的股票价格 ；非负整数 fee 代表了交易股票的手续费用。

你可以无限次地完成交易，但是你每笔交易都需要付手续费。如果你已经购买了一个股票，在卖出它之前你就不能再继续购买股票了。

返回获得利润的最大值。

注意：这里的一笔交易指买入持有并卖出股票的整个过程，每笔交易你只需要为支付一次手续费。

示例 1:
```
输入: prices = [1, 3, 2, 8, 4, 9], fee = 2
输出: 8
解释: 能够达到的最大利润:  
在此处买入 prices[0] = 1
在此处卖出 prices[3] = 8
在此处买入 prices[4] = 4
在此处卖出 prices[5] = 9
总利润: ((8 - 1) - 2) + ((9 - 4) - 2) = 8.
```
注意:

* 0 < prices.length <= 50000.
* 0 < prices[i] < 50000.
* 0 <= fee < 50000.

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

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