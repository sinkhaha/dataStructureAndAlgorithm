/**
 * 198 打家劫舍
 * 简单
 * 
 * 暴力法(动态规划)-⾃顶向下
 * 
 * 选择：抢 或 不抢
 * 状态：金额
 * 选择抢的话，得去抢下下家，dp[nums][start] = nums[start] + this.dp(nums, start + 2)
 * 选择不抢的话，可以抢下家，dp[nums][start] = this.dp(nums, start + 1)
 *
 * dp数组：
 * dp[nums][start]表示从nums[start..] 能抢到的最⼤值金额
 * 
 * base case:
 * 当start >= nums.length时 为0
 * 
 * @param {number[]} nums
 * @return {number}
 */
var rob1 = function (nums) {
    if (nums.length === 0) {
        return 0;
    }

    this.dp = function (nums, start) {
        if (start >= nums.length) {
            return 0;
        }

        const result = Math.max(
            nums[start] + this.dp(nums, start + 2), // 抢，去下下家
            this.dp(nums, start + 1) // 不抢，去下家
        );

        return result;
    }

    return dp(nums, 0);
};
const nums = [2, 7, 9, 3, 1];
console.log(rob1(nums)); // 12

// 解法一的优化，添加备忘录
var rob2 = function (nums) {
    if (nums.length === 0) {
        return 0;
    }

    // 此处的备忘录直接用个数组即可满足，key为下标
    const map = [];

    this.dp = function (nums, start) {
        if (start >= nums.length) {
            return 0;
        }

        if (map[start] !== undefined) {
            return map[start];
        }

        const result = Math.max(
            nums[start] + this.dp(nums, start + 2), // 抢，去下下家
            this.dp(nums, start + 1) // 不抢，去下家
        );

        map[start] = result;
        return result;
    }

    return dp(nums, 0);
};
console.log(rob2(nums)); // 12

// 解法三：自底向上的解法
var rob3 = function (nums) {
    let n = nums.length;

    // dp[i] = x 表⽰： 从第 i 间房⼦开始抢劫，最多能抢到的钱为 x
    // base case: dp[n] = 0 
    let dp = Array(n + 2).fill(0);

    for (let i = n - 1; i >= 0; i--) {
        dp[i] = Math.max(
            dp[i + 1],
            nums[i] + dp[i + 2]
        );
    }
    return dp[0];
}
console.log(rob3(nums)); // 12

// 解法四：解法三的状态压缩，空间复杂度为O(1)
var rob4 = function (nums) {
    let n = nums.length;
    // 记录两个状态 dp[i+1] 和 dp[i+2] 
    let dp_i_1 = 0;
    let dp_i_2 = 0;

    // 记录 dp[i]
    let dp_i = 0;
    for (let i = n - 1; i >= 0; i--) {
        dp_i = Math.max(
            dp_i_1, 
            nums[i] + dp_i_2
        );
        dp_i_2 = dp_i_1;
        dp_i_1 = dp_i;
    }

    return dp_i;
}
console.log(rob4(nums)); // 12
