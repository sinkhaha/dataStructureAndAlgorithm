/**
 * 312 戳气球
 * @param {number[]} nums
 * @return {number}
 */
var maxCoins = function (nums) {
    let n = nums.length;

    const points = new Array(n + 2);
    points[0] = points[n + 1] = 1;
    for (let i = 1; i <= n; i++) {
        points[i] = nums[i - 1];
    }

    // 初始化为0
    const dp = new Array(n + 2);
    for (let i = 0; i <= n + 1; i++) {
        dp[i] = new Array(n + 2);
        for (let j = 0; j <= n + 1; j++) {
            dp[i][j] = 0;
        }
    }
    console.log(dp);

    // 开始状态转移,i从下往上,从左往右遍历
    for (let i = n; i >= 0; i--) {
        // j 应该从左往右
        for (let j = i + 1; j < n + 2; j++) {
            // 最后戳破的气球是哪个？
            for (let k = i + 1; k < j; k++) {
                // 择优做选择
                dp[i][j] = Math.max(
                    dp[i][j],
                    dp[i][k] + dp[k][j] + points[i] * points[j] * points[k]
                );
            }
        }
    }

    return dp[0][n + 1];
};

const nums = [3, 1, 5, 8];
console.log(maxCoins(nums));
