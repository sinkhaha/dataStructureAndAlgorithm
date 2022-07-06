/**
 * 128. 最长连续序列
 * 中等
 * https://leetcode.cn/problems/longest-consecutive-sequence/
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
    // 遍历每个数，以当前数num为序列的起点，然后依次在数组找是否存在num+1, num+2, num+x ，直到num+x不存在停止，此时计算长度，比较下是否是最长
    let set = new Set(nums);

    let maxLength = 0;

    for (let num of nums) {
        // 因为是以当前num为序列的起点，所以x一定是在数组中不存在前驱数x−1 的，不然就是以x-1为起点了
        if (set.has(num - 1)) {
            continue;
        }

        let count = 1; // 当前num算一个长度
        while (set.has(num + 1)) {
            num++;
            count++;
        }

        maxLength = Math.max(maxLength, count);
    }

    return maxLength;
};