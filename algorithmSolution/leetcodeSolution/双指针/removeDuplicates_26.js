/**
 * 26 删除排序数组中的重复项
 * 
 * 是一个有序数组
 * 
 * 简单
 * https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/
 * 
 * 难点：要求空间复杂度O(1)
 * 
 * 双指针解法：让慢指针 slow 在后面，快指针 fast 在前面
 * 
 * 思路：
 * 快指针找到一个不重复的元素，slow 前进一步，并把fast索引的元素值赋给slow索引的元素值
 * 当 fast 指针遍历完nums后，nums[0..slow] 就是不重复元素
 * 
 * 时间复杂度O(n)
 * 空间复杂度O(1)
 * 
 * @param {*} nums 
 */
function removeDuplicates(nums) {
    let n = nums.length;
    if (n <= 1) {
        return nums;
    }

    let slow = 0;
    let fast = 1;

    while (fast < n) {
        if (nums[fast] !== nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
            fast++;
        } else {
            fast++;
        }
    }

    return slow + 1;
}
const nums = [1, 1, 2];
console.log(removeDuplicates(nums)); // 2, 即[1,2]
