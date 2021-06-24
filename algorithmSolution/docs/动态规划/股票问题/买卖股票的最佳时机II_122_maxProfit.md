## 题目
**122. 买卖股票的最佳时机 II**
>简单

https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/

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