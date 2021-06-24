## 题目
**152. 乘积最大子数组**
>中等

给你一个整数数组 nums ，请你找出数组中乘积最大的连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。

 

示例 1:
```
输入: [2,3,-2,4]
输出: 6
解释: 子数组 [2,3] 有最大乘积 6。
```
示例 2:
```
输入: [-2,0,-1]
输出: 0
解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。
```
>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/maximum-product-subarray
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
## 解法
### 思路
注意：数组中有负数的情况

1. dp数组定义
`dp[i][j]`：表示从0到i下标的元素的乘积正数最大值和负数最大值，j为0或1，0-正数最大值，1-负数最大值

1. 状态转移方程
``` javascript
// 状态转移
// 如果nums[i]为正
if (nums[i] >= 0) {
    dp[i][0] = dp[i-1][0] * nums[i] // 前一个的正数最大值乘以当前数
} else {
    dp[i][0] = dp[i-1][1] * nums[i] // 前一个的负数最大值乘以当前数
}
// 同理
if (nums[i] >= 0) {
    dp[i][1] = dp[i-1][1] * nums[i] // 前一个的负数最大值乘以当前数
} else {
    dp[i][1] = dp[i-1][0] * nums[i] // 前一个的整数最大值乘以当前数
}

// 所以状态转移方程为
dp[i][0]=Max(dp[i-1][0] * nums[i], dp[i-1][1] * nums[i], nums[i]);
dp[i][1]=Max(dp[i-1][1] * nums[i], dp[i-1][0] * nums[i], nums[i]);


所求结果即为Max(dp[i][0])
```

3. base case
`dp[0][0]=nums[0]`
`dp[0][1]=nums[0]`


### 代码
```javascript
/**
 * 
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
    if (!nums || nums.length === 0) {
        return 0;
    }

    // 固定长度为2即可
    const dp = Array(2).fill([0, 0]);
    console.log('dp=', dp);

    dp[0][1] = nums[0];
    dp[0][0] = nums[0];
    let res = nums[0];

    for (let i = 1; i < nums.length; i++) {
        let x = Math.floor(i % 2);
        let y = Math.floor((i - 1) % 2);

        let num = nums[i];
        let max = Math.max(dp[y][0] * num, dp[y][1] * num, num);
        let min = Math.min(dp[y][0] * num, dp[y][1] * num, num);
        dp[x][0] = max;
        dp[x][1] = min;

        res = Math.max(res, dp[x][0]);
    }

    return res;
};

const nums = [-2, -3, -4];
console.log(maxProduct(nums));
```
```javascript
// 第一种解法的简化
var maxProduct2 = function (nums) {
    if (!nums || nums.length === 0) {
        return 0;
    }
    
    let res = nums[0];
    // 用两个值存储即可
    let curMax = nums[0];
    let curMin = nums[0];

    for (let i = 1; i < nums.length; i++) {
        let num = nums[i];
        curMax = curMax * num;
        curMin = curMin * num;

        let min = Math.min(curMax, curMin, num);
        let max = Math.max(curMax, curMin, num);
        
        curMin = min;
        curMax = max;
        
        res = Math.max(curMax, res);
    }

    return res;
}
const nums2 = [-2, 3, -4];
console.log(maxProduct2(nums2));

```
### 复杂度
* 时间复杂度 O(N)
* 空间复杂度 O(1)

