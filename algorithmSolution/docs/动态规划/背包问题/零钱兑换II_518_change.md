## 题目
**518. 零钱兑换 II**
>中等

https://leetcode-cn.com/problems/coin-change-2/

## 解法1: 完全背包
## 思路
**可以转化为一个完全背包问题:**
有一个背包，最大容量为amount，有一系列物品coins，每个物品的重量为coins[i]，每个物品的数量无限，请问有多少种方法，能够把背包恰好装满

---

1. 状态：背包的容量 和 可选择的物品，有`dp[i][j]`种方法
2. 选择：装进背包 或者 不装进背包
3. dp数组：
`dp[i][j]`：表示若只使用前i个物品，当背包容量为j时，有`dp[i][j]`种方法可以装满背包，
即若只使用coins中的前i个硬币的面值，若想凑出金额j，有`dp[i][j]`种凑法

4. 状态转移方程
* 如果把第i个物品装入背包(即使用`coins[i]`这个面值的硬币)，

  此时凑法`dp[i][j]=dp[i][j - coins[i-1]] `；

  `j-coins[i-1]`表示当前背包的容量j减去当前i的重量`coins[i-1]`；
  (因为i是从 1 开始的，所以coins的索引为`i-1`时表示第i个硬币的面值)

* 如果不把第i个物品装入背包(即不使用`coins[i]`这个面值的硬币)，此时凑法为`dp[i][j]= dp[i-1][j]`，表示和之前状态的结果一样

综上，而想求的`dp[i][j]`是'共有多少种凑法”，所以`dp[i][j]`的值应该是以上两种选择的结果之和，所以状态转移方程如下
```javascript
// 当选择的第i个硬币的金额比想凑的金额大时，即只有选择不装
if (j - coins[i - 1] < 0) {
    dp[i][j] = dp[i - 1][j];
} else {
    // 我们要求的dp[i][j]是共有多少种凑法，所以dp[i][j]的值应该是以上两种选择的结果之和，dp[i][j] = 不装 + 装
    dp[i][j] = dp[i - 1][j] + dp[i][j - coins[i - 1]];
}

```

5. 基础情况
* `dp[0][..] = 0` 如果不使用任何硬币面值，就无法凑出任何金额，即0种凑法
* `dp[..][0] = 1 (注意dp[0][0]=1)` 如果要凑出的目标金额为 0，那么有唯一的一种凑法

## 代码
```javascript
/**
 * 
 * @param {*} amount 
 * @param {*} coins 
 */
function change(amount, coins) {
    let n = coins.length;

    // 初始化二维数组
    const dp = [];
    for (let i = 0; i < n + 1; i++) {
        dp[i] = [];
        for (let j = 0; j < amount + 1; j++) {
            // base case
            if (i === 0) {
                dp[0][j] = 0;
            }
            // base case
            if (j === 0) {
                dp[i][0] = 1;
            } else {
                dp[i][j] = 0;
            }
        }
    }

    console.log(dp);

    // 从左往右，从上往下遍历
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= amount; j++) {
            // 由于i是从 1 开始的，所以coins[i-1]时表示第i个硬币的面值
            // 当选择的第i个硬币的金额比想凑的金额大时，即只有选择不装
            if (j - coins[i - 1] < 0) {
                dp[i][j] = dp[i - 1][j];
            } else {
                // 不装 + 装
                dp[i][j] = dp[i - 1][j] + dp[i][j - coins[i - 1]];
            }
        }
    }
    return dp[n][amount];
}

const amount = 5;
const coins = [1, 2, 5];
console.log(change(amount, coins)); // 4
```
### 复杂度
 * 时间复杂度 O(N*amount)，N为coins的长度
 * 空间复杂度 O(N*amount)



## 解法2: (状态压缩)解法1的优化
```javascript
/**
 * 
 * 时间复杂度 O(N*amount)，N为coins的长度
 * 空间复杂度 O(amount)
 * 
 * @param {*} amount 
 * @param {*} coins 
 */
function change(amount, coins) {
    let n = coins.length;
    // 一维数组
    const dp = Array(amount + 1).fill(0);
    dp[0] = 1;

    for (let i = 0; i < n; i++) {
        for (let j = 1; j <= amount; j++) {
            if (j - coins[i] >= 0) {
                dp[j] = dp[j] + dp[j-coins[i]];
            }
        }
    }
    return dp[amount];
}
console.log(change(amount, coins)); // 4

```