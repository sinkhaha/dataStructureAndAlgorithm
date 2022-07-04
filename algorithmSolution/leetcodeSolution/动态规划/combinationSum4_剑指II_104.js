/**
 * 剑指 Offer II 104. 排列的数目
 * 中等
 * https://leetcode.cn/problems/D0F0SV/
 * 
 * 解法：动态规划
 * 
 * 时间O(target*n)
 * 空间O(target)
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function (nums, target) {
    // dp[x]表示选取的元素之和等于x的方案数，目标就是求dp[target]
    // base case: dp[0]=1，只有当不选取任何元素时，元素之和才为0，因此只有 1 种方案

    // 当 1 <= i <= target 时，如果存在一种排列，其中的元素之和等于i，则该排列的最后一个元素一定是数组nums 中的一个元素。假设该排列的最后一个元素是num，则一定有num <= i，对于元素之和等于i − num 的每一种排列，在最后添加 num 之后即可得到一个元素之和等于 i 的排列，因此在计算 dp[i] 时，应该计算所有的dp[i−num] 之和

    const dp = new Array(target + 1).fill(0);
    dp[0] = 1;

    for (let i = 1; i <= target; i++) {
        for (const num of nums) {
            if (num <= i) {
                dp[i] += dp[i - num];
            }
        }
    }

    return dp[target];
};