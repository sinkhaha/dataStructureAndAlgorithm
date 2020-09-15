// leetcode 300 最长上升子序列
/**
 * dp数组为以i为下标的nums[i]的值结尾时，此时的最长子序列的长度
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    const n = nums.length;
    if (n <= 0) {
        return n; 
    }
    // 初始化为1，因为最短的子序列包含自己，即1
    let dp = Array(n).fill(1);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    let maxRestult = 0;
    for (let i = 0; i < n; i++) {
        maxRestult = Math.max(maxRestult, dp[i]);
    }
    return maxRestult;
};

const nums = [10,9,2,5,3,7,101,18];
console.log(lengthOfLIS(nums));
