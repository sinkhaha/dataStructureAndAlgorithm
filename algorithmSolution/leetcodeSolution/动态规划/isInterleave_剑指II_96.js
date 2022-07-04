/**
 * 剑指 Offer II 096. 字符串交织
 * 中等
 * https://leetcode.cn/problems/IY6buf/
 * 
 * 解法：动态规划
 * 
 * 参考题解 https://leetcode.cn/problems/IY6buf/solution/hui-su-ji-yi-hua-san-zhi-zhen-mo-ni-hui-mcmyo/
 */
/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function (s1, s2, s3) {
    if (!s1 && !s2 && !s3) {
        return true;
    }

    let n1 = s1.length;
    let n2 = s2.length;
    let n3 = s3.length;
    if (n1 + n2 !== n3) {
        return false;
    }

    const dp = new Array(n1 + 1).fill(0).map(() => new Array(n2 + 1).fill(true));

    for (let i = 1; i < dp.length; i++) {
        dp[i][0] = dp[i - 1][0] && s3[i - 1] === s1[i - 1];
    }
    for (let j = 1; j < dp[0].length; j++) {
        dp[0][j] = dp[0][j - 1] && s3[j - 1] === s2[j - 1];
    }

    for (let i = 1; i < dp.length; i++) {
        for (let j = 1; j < dp[i].length; j++) {
            dp[i][j] =
                (dp[i - 1][j] && s3[i + j - 1] === s1[i - 1])
                || (dp[i][j - 1] && s3[i + j - 1] === s2[j - 1]);
        }
    }

    return dp[n1][n2];
};