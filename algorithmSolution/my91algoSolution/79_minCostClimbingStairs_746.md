## 题目
**746. 使用最小花费爬楼梯**
>简单

数组的每个下标作为一个阶梯，第 i 个阶梯对应着一个非负数的体力花费值 cost[i]（下标从 0 开始）。

每当你爬上一个阶梯你都要花费对应的体力值，一旦支付了相应的体力值，你就可以选择向上爬一个阶梯或者爬两个阶梯。

请你找出达到楼层顶部的最低花费。在开始时，你可以选择从下标为 0 或 1 的元素作为初始阶梯。

 

示例 1：
```
输入：cost = [10, 15, 20]
输出：15
解释：最低花费是从 cost[1] 开始，然后走两步即可到阶梯顶，一共花费 15 。
```
 示例 2：
```
输入：cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
输出：6
解释：最低花费方式是从 cost[0] 开始，逐个经过那些 1 ，跳过 cost[3] ，一共花费 6 。
```

提示：

* cost 的长度范围是 [2, 1000]。
* cost[i] 将会是一个整型数据，范围为 [0, 999] 。

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/min-cost-climbing-stairs
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法1：动态规划
### 思路
1. 状态是`dp[i]`，`dp[i]`为所求结果
2. 选择是`i`，即走到第i级
3. dp数组含义：`dp[i]`表示到达第i级台阶所花的最小花费，走到第i级台阶可以从第`i - 1`级台阶走到，也可以从第`i - 2`级台阶走到
4. 状态转移方程
>* 当`i = 0`时，`dp[0] = 0`
>* 当`i = 1`，`dp[1] = 0`
>* 当`2 <= i <= n时` ,`dp[i] = Math.min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2])`
5. 基础情况为`dp[0] = 0`，`dp[1] = 0`

### 代码
```js
/**
 *
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function(cost) {
    let n = cost.length;

    // 定义n+1的数组
    let dp = new Array(n+1);

    // base case
    dp[0] = dp[1] = 0;

    for (let i = 2; i <= n; i++) {
        dp[i] = Math.min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2]);
    }

    return dp[n];
};
```

### 复杂度
* 时间复杂度O(n)
* 空间复杂度O(n)

## 解法2: 解法1的优化，状态压缩
### 思路
观察解法1，发现当 `n >= i >= 2`时，`dp[i] 只和 dp[i−1] 与 dp[i−2] `有关，因此可以将空间复杂度优化到 `O(1)`

### 代码
```js
/**
 * 
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function(cost) {
    let n = cost.length;
    
    // base case
    let pre = 0;
    let cur = 0;
    
    for (let i = 2; i <= n; i++) {
        let next = Math.min(cur + cost[i-1], pre + cost[i-2]);
        pre = cur;
        cur = next;
    }

    return cur;

};
```
### 复杂度
* 时间杂度O(n)
* 空间杂度O(1)
