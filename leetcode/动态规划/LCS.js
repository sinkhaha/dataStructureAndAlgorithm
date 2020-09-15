/**
 * leetcode 1143. 最长公共子序列
 */
/**
 * 暴力解法（超出时间限制）
 * 
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence1 = function (text1, text2) {
    this.dp = function (i, j) {
        if (i === -1 || j === -1) {
            return 0;
        }
        if (text1[i] === text2[j]) {
            return this.dp(i - 1, j - 1) + 1;
        } else {
            return Math.max(this.dp(i - 1, j), this.dp(i, j - 1));
        }

    }
    return this.dp(text1.length - 1, text2.length - 1);
};

const text1 = 'abcde';
const text2 = 'ace';
console.log(longestCommonSubsequence1(text1, text2));

/**
 * 用dp table优化
 * @param {*} text1 
 * @param {*} text2 
 */
var longestCommonSubsequence2 = function (text1, text2) {
    const m = text1.length;
    const n = text2.length;

    // 定义二维数组m行，n列，初始化为0
    const dp = [];
    for (let i = 0; i < m + 1; i++) {
        dp[i] = [];
        for (let j = 0; j < n + 1; j++) {
            dp[i][j] = 0;
        }
    }

    console.log(dp);

    // 进行状态转移
    for (let i = 1; i < m + 1; i++) {
        for (let j = 1; j < n + 1; j++) {
            // 找到1个 lcs 的元素，然后继续往前找
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
            }
        }
    }
    console.log(dp);
    return dp[m][n];
};
console.log(longestCommonSubsequence2(text1, text2));
