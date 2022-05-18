## 题目
**121. 买卖股票的最佳时机**
>简单

给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。

你只能选择 `某一天` 买入这只股票，并选择在 `未来的某一个不同的日子` 卖出该股票。设计一个算法来计算你所能获取的最大利润。

返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。

 

示例 1：
```
输入：[7,1,5,3,6,4]
输出：5
解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
```     
示例 2：
```
输入：prices = [7,6,4,3,1]
输出：0
解释：在这种情况下, 没有交易完成, 所以最大利润为 0。
```

提示：

* 1 <= prices.length <= 10^5
* 0 <= prices[i] <= 10^4

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
## 解法1：贪心算法
### 思路
可以在历史最低点买的股票，记录一个历史最低价格点 minprice，
在第 i 天卖出股票能得到的利润就是 `prices[i] - minprice`，(即` 数组中最高的 - 最低的 = 利润最大的`)

只需要遍历价格数组一遍，判断当前值是否是记录历史最低价格点，如果当前值比最低点大，重新计算是否是最大利润 

### 代码
```javascript
/**
 * 
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    if (prices.length === 0) {
        return 0;
    }

    // 最低点
    let minPrice = Number.MAX_SAFE_INTEGER;
    // 最大利润
    let maxProfit = 0;
    for (let i = 0; i < prices.length; i++) {
        // 判断当前是否是最低价格点
        if (prices[i] < minPrice) {
            minPrice = prices[i];
            // 当前值比最低点大，重新计算是否是最大利润    
        } else if (prices[i] - minPrice > maxProfit) {
            maxProfit = prices[i] - minPrice;
        }
    }
    return maxProfit;
};

const prices = [7, 1, 5, 3, 6, 4];
console.log(maxProfit1(prices)); // 5

```
### 复杂度
* 时间复杂度O(n)，n为prices的长度
* 空间复杂度O(1)

## 解法2：动态规划
### 思路

状态转移方程：
`dp[i][1][0] = Max(dp[i-1][1][0], dp[i-1][1][1] + prices[i])`
`dp[i][1][1] = Max(dp[i-1][1][1], dp[i-1][0][0] - prices[i])`

根据base case，当k=0时，`dp[i-1][0][0]=0`所以
`dp[i][1][0] = Max(dp[i-1][1][0], dp[i-1][1][1] + prices[i])`
`dp[i][1][1] = Max(dp[i-1][1][1], -prices[i])`

因为k固定为1，所以可以简化为
`dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])`
`dp[i][1] = max(dp[i-1][1], -prices[i])`

### 代码
```javascript
/**
 * 
 */
var maxProfit2 = function (prices) {
    let n = prices.length;
    if (n == 0) {
        return 0;
    }
    // [[0, 0], [0, 0]......]
    let dp = Array(n).fill([0, 0]);

    // console.log('dp是', dp);

    for (let i = 0; i < n; i++) {
        // base case处理， i = 0 时 dp[i-1] 是不合法的
        if (i - 1 == -1) {
            dp[i][0] = 0; //  dp[i][0] = max(dp[-1][0], dp[-1][1] + prices[i]) = max(0, -infinity + prices[i]) = 0
            dp[i][1] = -prices[i]; //  dp[i][1] = max(dp[-1][1], dp[-1][0] - prices[i]) = max(-infinity, 0 - prices[i]) = -prices[i]
            continue;
        }
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
        dp[i][1] = Math.max(dp[i - 1][1], -prices[i]);
    }

    return dp[n - 1][0];
}

```
### 复杂度
* 时间复杂度O(n)
* 空间复杂度O(n)

## 解法3: 状态压缩
### 代码
```javascript
/**
 * 在原基础上状态压缩
 * 
 * 新状态只和相邻的一个状态有关，不用整个 dp 数组，只需要一个变量储存相邻的那个状态即可，可以把空间复杂度降到 O(1)
 * 
 * 时间复杂度O(n)
 * 空间复杂度O(1)
 * 
 * @param {*} prices 
 */
var maxProfit3 = function (prices) {
    let n = prices.length;
    if (n == 0) {
        return 0;
    }

    // base case: dp[-1][0] = 0, dp[-1][1] = -infinity
    let dp_i_0 = 0, dp_i_1 = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < n; i++) {
        // dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])
        dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
        // dp[i][1] = max(dp[i-1][1], -prices[i])
        dp_i_1 = Math.max(dp_i_1, -prices[i]);
    }
    return dp_i_0;
}

```
