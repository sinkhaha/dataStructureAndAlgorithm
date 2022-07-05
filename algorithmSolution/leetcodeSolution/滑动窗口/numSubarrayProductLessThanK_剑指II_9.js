/**
 * 剑指 Offer II 009. 乘积小于 K 的子数组
 * 中等
 * https://leetcode.cn/problems/ZVAVXX/
 * 
 * 解法：滑动窗口
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function (nums, k) {
    let n = nums.length;
    if (n == 0) {
        return 0;
    }

    let result = 0;
    let prod = 1; // 乘积

    let left = 0;
    let right = 0;
    while (right < n) {
        prod *= nums[right];

        while (left <= right && prod >= k) {
            prod /= nums[left]; // 缩小窗口
            left++;
        }

        // 乘积小于k，则更新结果，每个元素都可以单独作为子数组
        result += right - left + 1;

        right++;
    }

    return result;
};