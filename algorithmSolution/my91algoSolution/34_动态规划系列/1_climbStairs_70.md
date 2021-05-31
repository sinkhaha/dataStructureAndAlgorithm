## 题目
**70. 爬楼梯**
>简单

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

注意：给定 n 是一个正整数。

示例 1：
```
输入： 2
输出： 2
解释： 有两种方法可以爬到楼顶。
1.  1 阶 + 1 阶
2.  2 阶
```

示例 2：
```
输入： 3
输出： 3
解释： 有三种方法可以爬到楼顶。
1.  1 阶 + 1 阶 + 1 阶
2.  1 阶 + 2 阶
3.  2 阶 + 1 阶
```
>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/climbing-stairs
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法1:暴力递归

### 思路
暴力递归解法

**递归注意点：**
1. 注意爆栈
2. 存在重复的调用计算

### 代码
```javascript
// 全局变量，表示递归的深度
let depth = 0; 
function climbStairs(n) {
    // 防止爆栈
    ++depth;
    if (depth > 1000) {
        throw new Error('小心爆栈');
    }

    if (n < 1) {
        return 0;
    }
    if (n == 1) {
        return 1;
    }
    if (n == 2) {
        return 2;
    }
    return climbStairs(n - 2) + climbStairs(n - 1);
}
```

### 复杂度
* 时间复杂度 O(2^n)
* 空间复杂度 O(n)

## 解法2:备忘录递归

### 思路
解法1的优化，备忘录递归，使用哈希表存储每次计算出来的结果，相当于备忘录，起到减枝的作用，去除重复调用(重叠子问题)的计算

### 代码
```javascript
function climbStairs(n) {
    let mapData = new Map();
    return myClimbStairs(n, mapData); 
}

function myClimbStairs(n, mapData) {
    if (n < 1) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }
    if (n === 2) {
        return 2;
    }
    // 已经计算过直接返回
    if (mapData.get(n)) {
        return mapData.get(n);
    }

    let value = climbStairs(n - 1) + climbStairs(n - 2);
    mapData.set(n, value);
    return value;
}
```
### 复杂度
 * 时间复杂度O(n)
 * 空间复杂度O(n)


## 解法3:动态规划(推荐)

### 思路
1. 状态是`dp[i]`，`dp[i]`为所求结果
2. 选择是`i`，即走到第i级
3. dp数组含义：`dp[i]`表示第i级台阶的走法，第i级台阶的走法是第`i - 1`级和第`i - 2`级的走法之和
4. 状态转移方程
>* 当`n = 1`时，`dp[1] = 1`
>* 当`n = 2`时，`dp[2] = 2`
>* 当`n >= 3`时 `dp[n] = dp[n-1] + dp[n-2]`
5. 基础情况为`dp[1] = 1`，`dp[2] = 2`
---

>解法类似509题 斐波拉契数

### 代码
```javascript
/** 
 * 
 * @param {*} n 
 */
function climbStairs(n) {
    if (n < 1) {
        return 0;
    }
    // base case
    if (n === 1) {
        return 1;
    }
    if (n === 2) {
        return 2;
    }

    // 因为状态转移只和上一次迭代和上上次迭代的结果有关，所以只用两个变量存储，不需要用数组，减少了空间
    let pre = 1;
    let cur = 2;

    for (let i = 3; i <= n; i++) {
        let sum = pre + cur;
        pre = cur;
        cur = sum;
    }

    return cur;
}
```
### 复杂度
* 时间复杂度O(n)
* 空间复杂度O(1)