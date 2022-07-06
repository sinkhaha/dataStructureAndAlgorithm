/**
 * 31. 下一个排列
 * 中等
 * https://leetcode.cn/problems/next-permutation/
 * 
 * 解法：双指针
 * 
 * 时间O(n)
 * 空间O(1)
 */
/**
 * 
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
    let i = nums.length - 2;
    // 找出i
    while (i >= 0 && nums[i] >= nums[i + 1]) {
        i--;
    }

    // i<0则说明nums是递减排序，即为最大，直接翻转为最小排列即可
    if (i >= 0) {
        // 找出j
        let j = nums.length - 1;
        while (j >= 0 && nums[j] <= nums[i]) {
            j--;
        }

        // 交换i和j的数字
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }

    // 交换i+1后的数
    reverse(nums, i + 1);
};

// 双指针反转序列
function reverse(nums, start) {
    let left = start;
    let right = nums.length - 1;
    while (left < right) {
        [nums[left], nums[right]] = [nums[right], nums[left]];
        left++;
        right--;
    }
}