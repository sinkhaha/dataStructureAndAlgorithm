/**
 * 91. 解码方法
 * 中等
 * https://leetcode.cn/problems/decode-ways/
 * 
 * 解法：动态规划
 */
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
    // 动态规划

    // dp[i]表示第i个字符为结尾的字符串s[1...i]的编码总数
    // 当i可以与i-1组合编码成一个字符时，dp[i]=dp[i-2]（此时s[i-1] != 0且 10 * s[i-1] + s[i] <= 26 ）；当i自己编码成一个字符时，dp[i]=dp[i-1] (此时s[i] != 0)
    // 状态转移方程： dp[i] = dp[i-1] + dp[i-2] 累加即可
    // dp[0] = 1 只有一个数字，一定只有一种编码

    const n = s.length;
    const dp = new Array(n + 1).fill(0);

    dp[0] = 1;

    // 
    for (let i = 1; i <= n; i++) {
        if (s[i - 1] !== '0') {
            dp[i] += dp[i - 1];
        }
        if (i > 1 && s[i - 2] != '0' && ((s[i - 2] - '0') * 10 + (s[i - 1] - '0') <= 26)) {
            dp[i] += dp[i - 2];
        }
    }

    return dp[n];
};