/**
 * 44. 通配符匹配
 * 困难
 * https://leetcode.cn/problems/wildcard-matching/
 * 
 * 解法：动态规划
 */
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
    // 跟题目类似 *号的含义不同 https://leetcode.cn/problems/regular-expression-matching/

    // 动态规划 参考官方题解
    let m = s.length;
    let n = p.length;

    // dp[i][j] 表示字符串 s 的前 i 个字符和模式 p 的前 j 个字符是否能匹配
    const dp = Array.from(new Array(m + 1), () => new Array(n + 1).fill(false));
    dp[0][0] = true; // s和p都是空字符串，肯定可以匹配

    for (let i = 1; i <= n; i++) {
        if (p[i - 1] == '*') {
            dp[0][i] = true;
        } else {
            break;
        }
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (p[j - 1] == '*') {
                dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
            } else if (p[j - 1] == '?' || s[i - 1] == p[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            }
        }
    }

    return dp[m][n];

};