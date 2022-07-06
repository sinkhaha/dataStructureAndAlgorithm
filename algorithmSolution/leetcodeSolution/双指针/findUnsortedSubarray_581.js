/**
 * 581. 最短无序连续子数组
 * 中等
 * https://leetcode.cn/problems/shortest-unsorted-continuous-subarray/
 * 
 * 解法：双指针
 * 
 * 时间O(nlogn) 
 * 空间O(n)
 * 
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray = function (nums) {
    // 把数组分成3部分子数组，nums1，nums2，nums3，要求nums1和nums3的长度之和最长，此时nums2就是最短子数组
    // 先把nums从小到大排序，取最长的相同的前缀为nums2，取最长的相同的后缀为nums3,这样我们就可以取到最短的nums2

    // 判断是否有序，从小到大
    const isSorted = (nums) => {
        for (let i = 0; i < nums.length - 1; i++) {
            if (nums[i] > nums[i + 1]) {
                return false;
            }
        }

        return true;
    }

    if (isSorted(nums)) {
        return 0;
    }

    const newNums = nums.slice(0).sort((a, b) => parseInt(a) - parseInt(b));

    let left = 0;
    while (nums[left] == newNums[left]) {
        left++;
    }

    let right = newNums.length - 1;
    while (nums[right] == newNums[right]) {
        right--;
    }

    return right - left + 1;
};