/**
 * 442. 数组中重复的数据
 * 
 * https://leetcode-cn.com/problems/find-all-duplicates-in-an-array/
 * 给定一个整数数组 a，其中1 ≤ a[i] ≤ n （n为数组长度）, 其中有些元素出现两次而其他元素出现一次。
 *
 * 找到所有出现两次的元素。
 *
 * 你可以不用到任何额外空间并在O(n)时间复杂度内解决这个问题吗
 *
 */
/**
 * 1. 因为是1到n,且有些元素只出现2次,这里可以使用符号来标记元素是否出现过
 * 2. 下标为 i 的元素的符号，代表着值为 i + 1 的元素是否出现过，负号是出现过，正号是没出现过
 * 
 * 空间复杂度是 O(1)
 * 时间复杂度是 O(N)
 * 
 * 解法有点类似448
 * 
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function (nums) {
    const res = [];

    for (const num of nums) {
        const newIndex = Math.abs(num);
        // 该数对应的下标已经是负数，则说明已经重复了
        if (nums[newIndex - 1] < 0) {
            res.push(newIndex);
            // 把该数对应的下标变成负数    
        } else {
            nums[newIndex - 1] *= -1;
        }
    }

    return res;
};

const nums = [4, 3, 2, 7, 8, 2, 3, 1];
console.log(findDuplicates(nums)); // [2, 3]
