/**
 * 334. 递增的三元子序列
 * 中等
 * https://leetcode.cn/problems/increasing-triplet-subsequence/
 * 
 * 解法：贪心
 */
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var increasingTriplet = function (nums) {
    // 贪心
    let n = nums.length;
    if (n < 3) {
        return false;
    }

    let first = nums[0]; // 表示递增子序列的第1个数
    let second = Number.MAX_VALUE; // 表示递增子序列的第2个数，初始为一个最大的数

    for (let i = 1; i < n; i++) {
        const num = nums[i];

        if (num > second) { // 找到一个递增的子序列
            return true;
        } else if (num > first) { // 将second更新为num
            second = num;
        } else {
            first = num;
        }
    }
    return false;
};