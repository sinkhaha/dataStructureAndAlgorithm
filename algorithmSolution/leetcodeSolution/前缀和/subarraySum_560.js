/**
 * leetcode 560 和为K的子数组
 * 中等
 * https://leetcode-cn.com/problems/subarray-sum-equals-k/
 * 
 * 前缀和主要适用的场景是原始数组不会被修改的情况下，频繁查询某个区间的累加和。
 * 
 * 题目:
 * 给定一个整数数组和一个整数 k，你需要找到该数组中和为 k 的连续的子数组的个数。
 * 
 * 示例:
 * 输入:nums = [1,1,1], k = 2
 * 输出: 2 , [1,1] 与 [1,1] 为两种不同的情况。
 *
 * 解题思路：前缀和数组
 * 前缀和数组preSum的含义：preSum[i]就是nums[0..i-1]所有元素的累加和。
 * 如果想求nums[i..j]的累加和，只需要一步操作preSum[j+1]-preSum[i]即可，
 * 而不需要重新去遍历数组。
 * 
 * 
 * 时间复杂度O(n^2)
 * 空间复杂度O(n)
 * 
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    let n = nums.length;
    
    // 构造前缀和数组
    let preSum = [];
    preSum[0] = 0;
    for (let i = 1; i <= n; i++) {
        preSum[i] = preSum[i - 1] + nums[i - 1];
    }
    
    // 符合条件的个数
    let count = 0;
    
    for (let j = 1; j <= n; j++) {
        for (let i = 0; i < j; i++) {
            // preSum[j] - preSum[i] 表示区间[i,j-1]的和
            if (preSum[j] - preSum[i] === k) {
                count++;
            }
        }
    }
    return count;
};

const nums = [1, 1, 1];
const k = 2;
console.log(subarraySum(nums, k)); // 2

/**
 * 解法2:
 * 对解法1的优化：优化的思路，直接记录下有几个preSum[i]和preSum[j]-k相等，避免了内层的 for 循环
 * 
 * @param {*} nums 
 * @param {*} k 
 */
var subarraySum2 = function(nums, k) {
    let n = nums.length;
    let count = 0;
    // map存 {前缀和j: 该前缀和出现的次数}
    let preSumObj = {};
    preSumObj[0] = 1;

    // 前缀和j
    let sum_j = 0;
    for (let j = 0; j < n; j++) {
        sum_j += nums[j];

        // 要找的前缀和 nums[0...i]
        const sum_i = sum_j - k;
        // 如果前面有这个前缀和，直接更新结果,说明此时[i, j]这个区间是满足条件的
        if (preSumObj[sum_i] !== undefined) {
            count += preSumObj[sum_i];
        }

        // 记录 前缀和nums[0...j] 的 出现次数
        preSumObj[sum_j] = preSumObj[sum_j] !== undefined 
            ? preSumObj[sum_j] + 1
            : 1;
    }
    
    console.log(preSumObj);
    return count;
};

console.log(subarraySum2(nums, k)); // 2
