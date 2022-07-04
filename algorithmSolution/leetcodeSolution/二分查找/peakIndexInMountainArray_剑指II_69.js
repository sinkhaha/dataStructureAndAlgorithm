/**
 * 剑指 Offer II 069. 山峰数组的顶部
 * 简单
 * https://leetcode.cn/problems/B1IidL/
 * 
 * 解法：二分查找
 */
/**
 * @param {number[]} arr
 * @return {number}
 */
var peakIndexInMountainArray = function (arr) {
    let left = 0;
    let right = arr.length - 1;

    // 返回峰值的下标
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);

        if (arr[mid] < arr[mid + 1]) { // 递增，在右边寻找
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return left;
};