/**
 * 287. 寻找重复数
 * 中等
 * https://leetcode.cn/problems/find-the-duplicate-number/
 * 
 * 解法：快慢指针
 * 参考 https://leetcode.cn/problems/find-the-duplicate-number/solution/287xun-zhao-zhong-fu-shu-by-kirsche/
 *   
 * 
 * 时间O(n) 
 * 空间O(1)
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
    let slow = 0;
    let fast = 0;

    // 快慢指针只到相遇
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow != fast)

    slow = 0; // 一个指针从头开始，一个不变
    while (slow != fast) {
        slow = nums[slow];
        fast = nums[fast];
    }

    return slow;
};