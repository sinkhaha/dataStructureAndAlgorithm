/**
 * 剑指 Offer II 119. 最长连续序列
 * 中等
 * https://leetcode.cn/problems/WhsWhI/
 * 
 * 解法：哈希表
 * 
 * 时间O(n)
 * 空间O(n)
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
    let num_set = new Set();
    for (const num of nums) {
        num_set.add(num);
    }

    let longestStreak = 0;

    for (const num of num_set) {
        if (!num_set.has(num - 1)) {
            let currentNum = num;
            let currentStreak = 1;

            while (num_set.has(currentNum + 1)) {
                currentNum += 1;
                currentStreak += 1;
            }

            longestStreak = Math.max(longestStreak, currentStreak);
        }
    }

    return longestStreak;
};