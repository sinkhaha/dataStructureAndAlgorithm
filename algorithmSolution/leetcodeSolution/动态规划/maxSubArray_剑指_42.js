/**
 * 剑指 Offer 42. 连续子数组的最大和
 * 简单
 * 
 * https://leetcode.cn/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof/
 * 
 * 解法：动态规划
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    // 动态规划
    // dp[i]表示以i为结尾时连续子数组的和最大值，所以dp[i]即为所求结果
    // 转移方程 dp[i] = max(nums[i], dp[i - 1] + nums[i]) 因为nums[i]可以考虑自己成为一段，或着和前面的dp[i-1]成为一段
    // dp[0] = nums[0];
    // 时间O(n) 空间O(1)
    let pre = nums[0];
    let maxRst = pre;

    for (let i = 1; i < nums.length; i++) {
        pre = Math.max(nums[i] + pre, nums[i]);
        maxRst = Math.max(pre, maxRst);
    }

    return maxRst;
};