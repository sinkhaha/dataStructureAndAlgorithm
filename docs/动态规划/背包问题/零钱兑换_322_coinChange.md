## 题目
**322. 零钱兑换**
>中等

https://leetcode-cn.com/problems/coin-change/

## 解法1：暴力递归
### 代码
```javascript
/**
 * 解法一：暴力递归解法
 * 
 * @param {*} coins
 * @param {*} amount
 */
function coinChange(coins, amount) {
    this.cal = function (amount) {
        // 目标金额为0，所需硬币数量为0
        if (amount === 0) {
            return 0;
        }
        if (amount < 0) {
            return -1;
        }

        // 正无穷大的数值
        let result = Infinity;
        for (let coin of coins) {
            // 计算子问题
            const subResult = cal(amount - coin);
            // 子问题无解
            if (subResult === -1) {
                continue;
            }
            // 个数为 1 + 子问题的解, 1为选择来当前coin金额的硬币
            result = Math.min(result, 1 + subResult);
        }
        
        return result != Infinity ? result : -1;
    };

    return cal(amount);
}
```
## 解法2：备忘录递归剪枝
```javascript
/**
 * 解法二：解法一的优化
 * 备忘录
 * 
 * @param {*} coins 
 * @param {*} amount 
 */
function coinChange2(coins, amount) {
    let subResultMap = {};

    this.cal = function (amount) {
        if (subResultMap[amount] !== undefined) {
            return subResultMap[amount];
        }
        if (amount === 0) {
            return 0;
        }
        if (amount < 0) {
            return -1;
        }
    
        let result = Infinity;
        for (let coin of coins) {
            // 计算子问题
            const subResult = cal(amount - coin);
            // 子问题无解
            if (subResult === -1) {
                continue;
            }
            // 个数为 1 + 子问题的解
            result = Math.min(result, 1 + subResult);
        }

        // 备忘录
        subResultMap[amount] = result == Infinity ? -1 : result;
        return subResultMap[amount];
    };

    return cal(amount);
}

```
## 解法3：动态规划(推荐)
### 思路
1. 状态：目标金额i不同，至少需要`dp[i]`枚硬币

2. 选择：对于每个i，选择不同的硬币

3. dp 数组：
dp[i]：表示当目标金额为i时，至少需要`dp[i]`枚硬币凑出

4. 状态转移方程
  对于不同的目标金额i，遍历选择不同的硬币，找出满足凑满金额时需要的最少硬币数，
  当所选金额大于目标金额i，则跳过该选择，所以
  `dp[i] = Math.min(dp[i], dp[i - coin] + 1)`

  > 其中的`dp[i-coin]`表示选择金额为coin的硬币，此时目标金额为`i-coin`，选择的硬币数也加1

5. 基础情况base case
* `dp[0] = 0 `表示金额为0时，只需要0枚硬币
* 因为要取`dp[i]`的最小值，所以可以初始化`dp[i]为正无穷(i != 0)`
>  `dp[i]`可以初始化为 amount + 1， 因为凑成 amount 金额的硬币数最多只可能等于 amount（全用 1 元面值的硬币），所以初始化为 amount + 1 就相当于初始化为正无穷，因为`dp[amount]`不会有等于`amount + 1`的情况


### 代码
```javascript
/**
 * @param {*} coins 
 * @param {*} amount 
 */
function coinChange(coins, amount) {
    // 初始化为正无穷
    let dp = new Array(amount + 1).fill(amount + 1);
    
    // 金额为0时，需要0枚硬币
    dp[0] = 0;
    
    // 外层 for 循环在遍历所有状态(目标金额)的所有取值
    for (let i = 0; i < dp.length; i++) {
        // 内层 for 循环在求所有选择(coin)的最小值
        for (let coin of coins) {
            // i目标金额 < coin选择的金额 = 子问题无解
            if (i - coin < 0) {
                continue;
            }
            dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
        }
    }
    // dp[amount]等于初始值amount+1说明没有符合的结果
    return dp[amount] === amount + 1 ? -1 : dp[amount];
}
```
### 复杂度
* 时间复杂度O(n*amount)，n为coins的长度
* 空间复杂度O(1)