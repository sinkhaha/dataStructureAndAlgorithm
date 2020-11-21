## 题目
**312. 戳气球**
>困难

https://leetcode-cn.com/problems/burst-balloons/

## 解法: 动态规划

### 思路
由于戳气球的顺序不同，得到的分数不同，所以要穷举所有戳法，找出分数最高

**问题的转化**
根据题意，戳破一个气球得到的分数跟它相邻的两个气球有关联，即分数为`nums[i] * nums[i-1] * nums[i+1]`，因为动态规划的子问题必须独立，所以可以把题目的`nums[-1] = nums[n] = 1`边界加到数组nums的首尾，形成一个新的数组points，此时问题可以转化为

>在一排气球points中，戳破气球0和气球n+1之间的气球（不包括0和n+1），求最高能得到的分数



1. 状态：`i` 和 `j`

2. 选择：`最后被戳破的那个气球`（最后被戳破的气球可以是`i和j之间`的任意一个，不包括`i和j`）

3. dp数组的定义
`dp[i][j] = x`表示，`戳破气球i和气球j之间（不包括i和j）的所有气球，可以获得的最高分数x`，因为points数组已经添加了两个边界值，所以最后所求结果为`dp[0][n+1]`的值，表示戳破了`i和j之间`所有气球所得的最高分

4. 状态转移方程
如果最后一个被戳破气球是k，那必须戳破其前面`(i, k)`和其后面`(k, j)`的所有气球，`dp[i][j]`的值为：
`dp[i][j] = dp[i][k] + dp[k][j] + points[i]*points[k]*points[j]`
* `dp[i][k]`表示把开区间`(i, k)`的气球都戳破，此时`i`就变成`k`的相邻气球
* `dp[k][j]`表示把开区间`(k, j)`的气球都戳破，此时`j`就变成`k`的相邻气球
* `points[i]*points[k]*points[j]`表示`k`相邻的气球是`i`和气球`j`，所以得分为三者的乘积

所以状态的转移要穷举`i`和`j`之间的所有气球(`i<k<j`)，选择`dp[i][j]`最高分的即可
```
// 做选择，最后被戳破的气球是哪个
for (let k = i + 1; k < j; k++) {
    // 选dp[i][j]最大，即得分最高的
    dp[i][j] = Math.max(
        dp[i][j], 
        dp[i][k] + dp[k][j] + points[i]*points[j]*points[k]
    );
}
```

5. 基础情况 base case
`dp[i][j] = 0` (0 <= i <= n+1, j <= i+1)
表示在开区间`(i, j)`中间没有气球可以戳的情况

`dp[i][j]=0`即dp表格对角线的值为0，所求结果`dp[0][n+1]`为表格右上角的值，
所以可以选择`从下到上，从左往右`进行遍历


### 代码
```javascript
/**
 *
 * @param {number[]} nums
 * @return {number}
 */
var maxCoins = function (nums) {
    let n = nums.length;

    // 根据题意，数组的首尾加2个虚拟气球，形成一个新的数组points
    // 原先气球的索引是1到n，索引0和n+1的位置是两个虚拟气球
    const points = new Array(n + 2);
    points[0] = points[n + 1] = 1;
    for (let i = 1; i <= n; i++) {
        points[i] = nums[i - 1];
    }

    // dp数组初始化为0，此时base case dp[i][j]也被初始化为0
    const dp = new Array(n + 2);
    for (let i = 0; i <= n + 1; i++) {
        dp[i] = new Array(n + 2);
        for (let j = 0; j <= n + 1; j++) {
            dp[i][j] = 0;
        }
    }
    console.log(dp);
    
    // 从下往上，从左往右遍历
    // 开始状态转移，i从下往上遍历
    for (let i = n; i >= 0; i--) {
        // j从左往右遍历
        for (let j = i + 1; j < n + 2; j++) {
            // 做选择，即选择最后戳破的气球k是哪个（i<k<j）
            for (let k = i + 1; k < j; k++) {
                // 保存当前分数最高的
                dp[i][j] = Math.max(
                    dp[i][j],
                    dp[i][k] + dp[k][j] + points[i] * points[j] * points[k]
                );
            }
        }
    }

    return dp[0][n + 1];
};
```

### 复杂度
* 时间复杂度`O(n^3)`，n是气球的数量，状态数是为n^2，转移复杂度为O(n)，所以O(n^2 * n) = O(n^3)
* 空间复杂度`O(n^2)`，n是气球的数量