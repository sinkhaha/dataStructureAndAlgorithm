/**
 * 152 积最大子数组
 * 
 * 中等
 * 
 * 注意：有负数
 * 
 * 动态规划：
 * 
 * 1、dp定义
 * dp[i][j]：表示从0到i下标的元素的乘积正数最大值和负数最大值， j为0或1，0-正数最大值，1-负数最大值
 * 
 * 2、状态转移方程
 *  如果nums[i]为正,
 * if (nums[i] >= 0) {
 *     dp[i][0] = dp[i-1][0] * nums[i]
 * } else {
 *     dp[i][0] = dp[i-1][1] * nums[i]
 * }
 * 同理
 * if (nums[i] >= 0) {
 *     dp[i][1] = dp[i-1][1] * nums[i]
 * } else {
 *     dp[i][1] = dp[i-1][0] * nums[i]
 * }
 * 
 * 结果即为Max(dp[i][0])
 * 
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
    if (!nums || nums.length === 0) {
        return 0;
    }
    // 长度为2即可
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

// 第一种解法的简化
var maxProduct2 = function (nums) {
    if (!nums || nums.length === 0) {
        return 0;
    }
    
    let res = nums[0];
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
