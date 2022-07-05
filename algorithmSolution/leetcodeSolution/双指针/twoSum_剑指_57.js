/**
 * 剑指 Offer 57. 和为s的两个数字
 * 简单
 * https://leetcode.cn/problems/he-wei-sde-liang-ge-shu-zi-lcof/
 * 
 * 解法：双指针
 * 
 * 时间O(n) 
 * 空间O(1)
 * 
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        const sum = nums[left] + nums[right];
        if (sum > target) {
            right--;
        } else if (sum < target) {
            left++;
        } else {
            return [nums[left], nums[right]];
        }
    }

    return [];
};