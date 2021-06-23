/**
 * leetcode 167 两数之和--给定的数据有序
 * https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/
 * 
 * 因为是有序，可以利用双指针
 * 
 * 时间复杂度O(n),n为数组长度
 * 空间复杂度O(1)
 * 
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    let low = 0;
    let high = nums.length - 1;

    while (low < high) {
        const sum = nums[low] + nums[high];
        if (sum > target) {
            high--;
        } else if (sum < target) {
            low++;
        } else {
            // 相等，题目要求的是输出第几个，而非数组下标
            return [low + 1, high + 1];
        }
    }

    // 找不到
    return [-1, -1];
};

const nums = [2, 7, 11, 15];
const target = 18;
console.log(twoSum(nums, target)); // [1, 2]
