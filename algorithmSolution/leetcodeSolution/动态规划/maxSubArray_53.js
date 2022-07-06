/**
 * 53. 最大子数组和
 * 简单
 * https://leetcode.cn/problems/maximum-subarray/
 * 
 * 解法：动态规划
 * 
 * 空间O(1) 
 * 时间O(n)
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    // dp[i]表示以i为结尾的连续子数组的最大和
    let pre = 0;
    let rst = nums[0];

    for (let i = 0; i < nums.length; i++) {
        // 转移方程 dp[i]=max(dp[i-1]+ nums[i], nums[i]))
        // 可能是nums[i]加上dp[i-1]是最大值，也可能是nums[i]自己就是最大值
        pre = Math.max(pre + nums[i], nums[i]);
        rst = Math.max(pre, rst);

    }

    return rst;
};