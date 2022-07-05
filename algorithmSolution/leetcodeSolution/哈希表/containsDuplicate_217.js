/**
 * 217. 存在重复元素
 * 简单
 * https://leetcode.cn/problems/contains-duplicate/
 */
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
    const set = new Set(nums);
    if (set.size !== nums.length) {
        return true;
    }

    return false;
};