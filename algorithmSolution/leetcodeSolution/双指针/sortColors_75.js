/**
 * 75. 颜色分类
 * 中等
 * https://leetcode.cn/problems/sort-colors/
 * 
 * 解法：双指针
 * 时间O(n) 
 * 空间O(1)
 */
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
    // 双指针，一次遍历
    let p0 = 0;
    let p1 = 0;
    let n = nums.length;

    for (let i = 0; i < n; i++) {
        if (nums[i] === 1) {
            // 找到1，直接交换
            [nums[i], nums[p1]] = [nums[p1], nums[i]];
            p1++;
        } else if (nums[i] === 0) {
            // 找到0，直接交换，可能会把已经排好序的1交换到nums[i]位置
            [nums[i], nums[p0]] = [nums[p0], nums[i]];

            // 此时会把p0后面已经排好序的1交换到nums[i]位置
            if (p0 < p1) { // 把被交换到后面的1重新交换到p1后面
                [nums[i], nums[p1]] = [nums[p1], nums[i]]
            }

            p0++;
            p1++; // 因为p0一定是 小于等于 p1，所以当p0向右移动了，那p1一定要向右移动。(因为1是排在0后面，所以不存在p1 < p0的情况)
        }

    }

};