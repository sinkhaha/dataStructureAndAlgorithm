## 题目
**309. 最佳买卖股票时机含冷冻期**
>中等

给定一个整数数组，其中第 i 个元素代表了第 i 天的股票价格 。​

设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:

你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。
示例:
```
输入: [1,2,3,0,2]
输出: 3 
解释: 对应的交易状态为: [买入, 卖出, 冷冻期, 买入, 卖出]

```
>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

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
