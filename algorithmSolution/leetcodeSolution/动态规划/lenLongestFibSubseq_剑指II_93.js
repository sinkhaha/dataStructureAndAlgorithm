/**
 * 剑指 Offer II 093. 最长斐波那契数列
 * 中等
 * https://leetcode.cn/problems/Q91FMA/
 * 
 * 解法：动态规划
 */
/**
 * @param {number[]} arr
 * @return {number}
 */
var lenLongestFibSubseq = function (arr) {
    const n = arr.length;
    const map = new Map(); // key是arr的元素，value是元素在arr的下标

    // dp[i][j]，表示最大元素是arr[i]且 次大元素是arr[j] 的斐波拉契数列时的长度
    // 状态转移方程：dp[i,j] = dp[j,k] + 1，条件是 arr[k] = arr[i] - arr[j] 且k < j < i

    const dp = new Array(n).fill(0).map(() => new Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        map.set(arr[i], i);
    }

    let ans = 0;
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            // arr[i]-arr[j]即arr[i]跟i前面的每个元素的差值
            // 如果差值存在，即k>=0且k<j，说明形成斐波拉契数列，dp[i,j] = dp[j, k] + 1
            // 如果差值不存在，则形成初始的斐波拉契数列，dp[i,j] = 2

            const k = map.get(arr[i] - arr[j]);

            dp[i][j] = k >= 0 && k < j
                ? dp[j][k] + 1
                : 2;

            if (ans < dp[i][j]) {
                ans = dp[i][j];
            }
        }
    }

    // 斐波拉契数列必须大于2，当小于等于2则返回0
    return ans > 2 ? ans : 0;
};