/**
 * 剑指 Offer II 020. 回文子字符串的个数
 * 中等
 * https://leetcode.cn/problems/a7VOhD/
 * 
 * 解法：动态规划
 * 
 * 参考 https://leetcode.cn/problems/palindromic-substrings/solution/shu-ju-jie-gou-he-suan-fa-dong-tai-gui-h-3bms/
 */
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
    // dp[i][j]表示[i,j]是否可以组成回文字符串

    // 状态转移方程:
    // 1、当s[i]!=s[j]时，dp[i][j]=false
    // 2、当s[i]==s[j]时
    //    如果j-i<=2，即i和j之间只有0个字符或1个字符，此时dp[i][j]=true
    //    如果j-i>2，即i和j之间多于1个字符，此时要看[i+1,j-1]是否是回文串，即dp[i][j]=dp[i+1][j-1]

    let n = s.length;
    let dp = Array.from(new Array(n), () => new Array(n).fill(false));

    let res = 0;

    // 斜着遍历，从下往上遍历，从左往右遍历
    for (let i = n - 1; i >= 0; i--) {
        for (let j = i; j < n; j++) {
            // s[i]不等于s[j]，dp[i][j]不能构成回文字符串
            if (s[i] != s[j]) {
                dp[i][j] = false;
                continue;
            } else {
                if (j - i <= 2) { // 当s[i]等于s[j]时，如果i和j之间只剩0个字符或1个字符，那一定是回文串
                    dp[i][j] = true;
                } else { // 表示i和j之间多余1个字符，要判断[i+1,j-1]是否是回文串
                    dp[i][j] = dp[i + 1][j - 1];
                }
            }

            // 表示[i,j]能构成回文串，结果加1
            res += dp[i][j] ? 1 : 0;
        }
    }

    return res;
};