/**
 * 283. 移动零
 * 简单
 * https://leetcode.cn/problems/move-zeroes/
 * 
 * 解法：双指针
 * 
 * 时间O(n)
 * 空间O(1)
 */
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
    // 使用双指针，左指针指向当前已经处理好的序列的尾部，右指针指向待处理序列的头部
    // 右指针不断向右移动，每次右指针指向非零数，则将左右指针对应的数交换，同时左指针右移

    // 注意到以下性质：
    //  1. 左指针左边均为非零数
    //  2. 右指针左边直到左指针处均为零

    let left = 0
    let right = 0;
    let n = nums.length;

    while (right < n) {
        if (nums[right] != 0) {
            [nums[left], nums[right]] = [nums[right], nums[left]];
            left++;
            right++;
        } else {
            right++;
        }
    }

};