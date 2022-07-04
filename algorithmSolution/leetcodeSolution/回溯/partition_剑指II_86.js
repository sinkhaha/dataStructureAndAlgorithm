/**
 * 剑指 Offer II 086. 分割回文子字符串
 * 中等
 * https://leetcode.cn/problems/M99OJA/
 * 
 * 解法：回溯 + 动态规划预处理
 */
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
    // 回溯
    const dfs = (i) => {
        if (i === n) {
            ret.push(ans.slice());
            return;
        }

        for (let j = i; j < n; ++j) {
            if (dp[i][j]) { // 是回文串才继续做选择
                ans.push(s.slice(i, j + 1)); // 选择[i,j]子串
                dfs(j + 1);
                ans.pop(); // 撤销选择
            }
        }
    }

    const n = s.length;

    // dp二维数组存储是否是回文串的状态
    // dp[i][j]表示s[i,j]是否是回文串
    // 状态转移方程 当i==j时，dp[i][j]=true；当s[i]==s[j]时，dp[i][j]=dp[i+1][j-1]
    const dp = new Array(n).fill(0).map(() => new Array(n).fill(true));
    let ret = [];
    let ans = [];

    for (let i = n - 1; i >= 0; --i) {
        for (let j = i + 1; j < n; ++j) {
            dp[i][j] = (s[i] === s[j]) && dp[i + 1][j - 1];
        }
    }

    dfs(0);
    return ret;
};