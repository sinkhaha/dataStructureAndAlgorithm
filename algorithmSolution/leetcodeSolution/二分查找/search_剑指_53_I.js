/**
 * 剑指 Offer 53 - I. 在排序数组中查找数字 I
 * 简单
 * https://leetcode.cn/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/
 * 
 * 解法：二分查找
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    if (nums.length === 0) {
        return 0;
    }

    let left = 0;
    let right = nums.length - 1;

    let firstTargetIndex = 0;

    // 找到第1个等于target的值，记下下标，因为是排好序的，接着从该下标从右遍历直到元素的值不等于target为止
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (nums[mid] === target) {
            if (mid === 0 || nums[mid - 1] !== target) {
                firstTargetIndex = mid;
                break;
            } else {
                right = mid - 1;
            }
        } else if (nums[mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }


    let count = 0;
    for (let i = firstTargetIndex; i < nums.length; i++) {
        if (nums[i] === target) {
            count += 1;
        } else {
            break;
        }
    }

    return count;
};