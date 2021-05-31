## 题目
**494. 目标和**
>中等

给定一个非负整数数组，a1, a2, ..., an, 和一个目标数，S。现在你有两个符号 + 和 -。对于数组中的任意一个整数，你都可以从 + 或 -中选择一个符号添加在前面。

返回可以使最终数组和为目标数 S 的所有添加符号的方法数。

 

示例：
```
输入：nums: [1, 1, 1, 1, 1], S: 3
输出：5
解释：

-1+1+1+1+1 = 3
+1-1+1+1+1 = 3
+1+1-1+1+1 = 3
+1+1+1-1+1 = 3
+1+1+1+1-1 = 3

一共有5种方法让最终目标和为3。
```

提示：

* 数组非空，且长度不会超过 20 。
* 初始的数组的和不会超过 1000 。
* 保证返回的最终结果能被 32 位整数存下。

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/target-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：动态规划
### 思路
0-1背包问题
01背包问题是`选`或`不选`，但本题是必须选，是`选+`还是`选-`

**将本问题转换为01背包问题**
>假设所有符号为+的元素和为target，符号为-的元素和的绝对值就是sum - target
我们想要的 `S = 正数和 - 负数和 = target - (sum - target)`
可以求出 `target = (S + sum) / 2`
于是转化成了`求容量为target的01背包问题`


1. dp数组
`dp[j]`表示填满容量为`j`的背包，有`dp[j]`种方法，`dp[-1]`即为所求结果

2. base case
因为填满容量为0的背包有且只有一种方法，所以`dp[0] = 1`

3. 状态转移方程
  `当前填满容量为j的包的方法数 = 之前填满容量为j的包的方法数 + 之前填满容量为j - num的包的方法数`，

  即`dp[j] = dp[j] + dp[j - num]`

### 代码
```js
/**
 * 
 * 
 * @param {number[]} nums
 * @param {number} S
 * @return {number}
 */
var findTargetSumWays = function(nums, S) {
    let sum = 0;
    for (let num of nums) {
        sum += num;
    }

    // S大于sum，不可能实现，返回0
    if (S > sum) {
        return 0;
    }
    
    // 如果S + sum不是偶数，不可能实现，返回0
    if ((S + sum) % 2 == 1) {
        return 0;
    }

    let target = Math.floor((S + sum) / 2);
    let dp = Array(target + 1).fill(0);
    dp[0] = 1;

    for (let num of nums) {
        for (let j = target; j >= num; j--) {
            dp[j] = dp[j] + dp[j - num];
        }
    }

    return dp[target];
};
```
### 复杂度
* 时间复杂度：O(n * target)
* 空间复杂度：O(target)
