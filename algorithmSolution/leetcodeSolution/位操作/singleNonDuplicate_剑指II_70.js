/**
 * 剑指 Offer II 070. 排序数组中只出现一次的数字
 * 中等
 * https://leetcode.cn/problems/skFtm2/
 * 
 * 解法：异或
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function (nums) {
    // 异或
    let result = 0;
    for (let num of nums) {
        result = result ^ num;
    }

    return result;
};