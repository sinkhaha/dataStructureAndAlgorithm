/**
 * 41. 缺失的第一个正数
 * 困难
 * https://leetcode.cn/problems/first-missing-positive/
 * 
 * 解法：哈希表
 * 
 * 时间O(n) 
 * 空间O(1)
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
    // 最小正整数在[1, N+1]中
    // 如果 [1, N]都出现了，那么答案是 N+1，否则是[1,N] 中没有出现的最小正整数
    let n = nums.length;

    // 把小于等于0的值变成n+1
    for (let i = 0; i < n; i++) {
        if (nums[i] <= 0) {
            nums[i] = n + 1;
        }
    }

    // 打上负号的标记
    for (let i = 0; i < n; i++) {
        let num = Math.abs(nums[i]); // 因为nums可能有重复的数字，即nums[i]可能已经是负数了，需要取绝对值
        if (num <= n) {
            nums[num - 1] = -Math.abs(nums[num - 1]); // 把num-1的位置变成负数，标示这个数已经出现在原数组中了
        }
    }


    // 遍历，找出没有被标记的
    for (let i = 0; i < n; i++) {
        if (nums[i] > 0) { // 说明不存在 i+1 这个数，所以nums[i]没有变成负数
            return i + 1;
        }
    }

    return n + 1;
};