/**
 * 剑指 Offer 03. 数组中重复的数字
 * 简单
 * https://leetcode.cn/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/
 * 
 * 解法：哈希表
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function (nums) {
    // 时间和空间都是O（n）
    let set = new Set();

    for (let i = 0; i < nums.length; i++) {
        if (set.has(nums[i])) {
            return nums[i];
        }
        set.add(nums[i]);
    }

};