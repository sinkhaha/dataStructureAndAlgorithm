## 题目
**122. 买卖股票的最佳时机 II**
>简单

给定一个数组 prices ，其中 prices[i] 是一支给定股票第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。

注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

 

示例 1:
```
输入: prices = [7,1,5,3,6,4]
输出: 7
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
```
示例 2:
```
输入: prices = [1,2,3,4,5]
输出: 4
解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
```
示例 3:
```
输入: prices = [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
```

提示：

* 1 <= prices.length <= 3 * 10^4
* 0 <= prices[i] <= 10^4

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
## 解法：贪心算法
### 思路
* 如果当天价格比昨天高，则当天选择卖出，计算可得的利润
* 如果当天价格比昨天低，则选择不卖出
  
### 代码
```javascript
/**
 *
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let n = prices.length;
    if (n === 0) {
        return 0;
    }

    // 最大利润
    let maxProfit = 0;

    for (let i = 1; i < n; i++) {
        // 如果当前价格比昨天大，则卖出，那加上今天可以所得的利润，即每一步都是最佳选择
        if (prices[i] > prices[i - 1]) {
            maxProfit += prices[i] - prices[i - 1];
        }
    }

    return maxProfit;
};

```
### 复杂度
* 时间复杂度：O(N)，N为prices的长度
* 空间复杂度：O(1)

## 解法2：动态规划
### 代码
```javascript
/**
 * 
 * k 为正无穷，可以认为 k 和 k - 1 一样
 *
 * dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
 * dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])
 *             = max(dp[i-1][k][1], dp[i-1][k][0] - prices[i])
 * 
 * 数组中的 k 已经不会改变了，也就是不需要记录 k 这个状态了，即
 * dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])
 * dp[i][1] = max(dp[i-1][1], dp[i-1][0] - prices[i])
 * 
 * 309题在这个基础上加了冷冻期
 * 
 * @param {*} prices 
 */
var maxProfit = function (prices) {
    let n = prices.length;
    let dp_i_0 = 0, dp_i_1 = Number.MIN_SAFE_INTEGER;
    
    for (let i = 0; i < n; i++) {
        let temp = dp_i_0;
        dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
        dp_i_1 = Math.max(dp_i_1, temp - prices[i]);
    }
    return dp_i_0;
}
```
