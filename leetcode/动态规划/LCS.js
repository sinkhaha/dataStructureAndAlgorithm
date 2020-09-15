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

