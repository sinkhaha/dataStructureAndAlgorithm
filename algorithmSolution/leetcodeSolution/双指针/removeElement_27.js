/**
 * 27. 移除元素
 * 简单
 * https://leetcode.cn/problems/remove-element/
 * 
 * 解法：双指针
 * 
 * 时间O(n) 
 * 空间O(1)
 */
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
    let left = -1;
    let right = 0;

    // 双指针 左指针存不为目标值的数据
    for (let i = 0; i < nums.length; i++) {
        // 右指针等于目标值，则右指针跳过继续向右移动
        // 右指针不等于目标值，则先移动左指针，把该值存到左指针位置
        if (nums[right] != val) {
            left++;
            nums[left] = nums[right];
            right++;
        } else {
            right++;
        }
    }

    return left + 1;
};