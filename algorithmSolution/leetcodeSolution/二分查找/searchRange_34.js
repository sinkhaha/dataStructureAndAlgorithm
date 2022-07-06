/**
 * 34. 在排序数组中查找元素的第一个和最后一个位置
 * 中等
 * https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/
 * 
 * 解法：两次二分查找
 * 
 * 时间O(logN)
 * 空间O(1)
 */
/**
 * 
 * 思路：二分查找中，寻找leftIdx 即为在数组中寻找第一个大于等于target 的下标，
 * 寻找 rightIdx 即为在数组中寻找第一个大于 target 的下标，然后将下标减一
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
    let res = [-1, -1];

    let n = nums.length;

    if (n === 1) {
        if (nums[0] !== target) {
            return [-1, -1];
        } else {
            return [0, 0]
        }
    }

    // 二分查找找到第1个 大于等于target的值，那开始位置就是此时找到的值的下标
    let leftIndex = binarySearch(nums, target, true);
    // 二分查找找到第1个 大于target的值，那结束位置就是此时找到的值的下标减去1
    let rightIndex = binarySearch(nums, target, false) - 1;

    if (leftIndex <= rightIndex && rightIndex < n &&
        target === nums[leftIndex] && target === nums[rightIndex]) {
        return [leftIndex, rightIndex];
    }

    return res;
};

// 在nums 数组中二分查找target 的位置
// 如果 isLeft 为 true，则查找第一个大于等于target 的下标，否则查找第一个大于 target 的下标
function binarySearch(nums, target, isLeft) {
    let low = 0;
    let high = nums.length - 1;

    let rst = nums.length;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if ((isLeft && nums[mid] >= target) || nums[mid] > target) {
            high = mid - 1;
            rst = mid;
        } else {
            low = mid + 1;
        }
    }

    return rst;
}