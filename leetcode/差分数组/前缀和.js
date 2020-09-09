/**
 * leetcode 560 
 * 
 * 题目:
 * 给定一个整数数组和一个整数 k，你需要找到该数组中和为 k 的连续的子数组的个数。
 * 
 * 示例:
 * 输入:nums = [1,1,1], k = 2
 * 输出: 2 , [1,1] 与 [1,1] 为两种不同的情况。
 *
 * 解题思路：前缀和数组
 * 前缀和数组preSum的含义：preSum[i]就是nums[0..i-1]的和。
 * 如果想求nums[i..j]的和，只需要一步操作preSum[j+1]-preSum[i]即可，
 * 而不需要重新去遍历数组
 * 
 * 时间复杂度O(n^2)
 * 空间复杂度O(n)
 * 
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    let n = nums.length;
    // 前缀和数组
    let preSum = [];
    preSum[0] = 0;
    for (let i = 1; i <= n; i++) {
        preSum[i] = preSum[i - 1] + nums[i - 1];
    }
    
    // 符合条件的个数
    let count = 0;
    for (let j = 1; j <= n; j++) {
        for (let i = 0; i < j; i++) {
            // 前缀和相减代表区间[i,j]的和等于k
            if (preSum[j] - preSum[i] === k) {
                count++;
            }
        }
    }
    return count;
};

