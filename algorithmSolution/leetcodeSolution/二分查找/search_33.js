/**
 * 33. 搜索旋转排序数组
 * 中等
 * https://leetcode.cn/problems/search-in-rotated-sorted-array/
 * 
 * 解法：二分查找
 * 
 * 时间O(logn)
 * 空间O(1)
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    let n = nums.length;
    if (!n) {
        return -1;
    }
    if (n === 1) {
        return nums[0] === target ? 0 : -1;
    }

    // 二分查找
    let low = 0;
    let high = n - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (nums[mid] === target) {
            return mid;
        }

        // mid左边序列是有序的
        if (nums[0] <= nums[mid]) {
            // 目标值在左边的有序区中，只在有序区查找
            if (target >= nums[0] && target < nums[mid]) {
                high = mid - 1;
            } else { // 目标值在无序区中
                low = mid + 1;
            }
            // mid右边序列是有序的
        } else {
            // 目标值在右边的有序区中
            if (target > nums[mid] && target <= nums[n - 1]) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
    }

    return -1;
};