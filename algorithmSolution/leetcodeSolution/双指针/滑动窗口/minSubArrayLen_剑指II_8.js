/**
 * 剑指 Offer II 008. 和大于等于 target 的最短子数组
 * 中等
 * https://leetcode.cn/problems/2VG8Kg/
 * 
 * 解法：滑动窗口
 */
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
    // 滑动窗口 时间O(n) 空间O(1)
    if (nums.length == 0) {
        return 0;
    }

    let left = 0;
    let right = 0;

    let result = Number.MAX_VALUE;

    let sum = 0; // 窗口内的值

    while (right < nums.length) {
        sum += nums[right];

        // 扩大窗口后，值大于目标值，则需要计算长度，并一直缩小窗口
        while (sum >= target) {
            result = Math.min(result, right - left + 1);

            // 缩小窗口
            sum -= nums[left];
            left++;
        }

        right++; // 扩大窗口
    }

    return result == Number.MAX_VALUE ? 0 : result;
};