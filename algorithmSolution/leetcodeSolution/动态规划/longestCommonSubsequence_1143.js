/**
 * leetcode 1143. 最长公共子序列lcs
 * https://leetcode-cn.com/problems/longest-common-subsequence/
 */
/**
 * 递归（暴力解法）（超出时间限制）
 * 
 * 具体解法可以参考解法二，只不过解法一的dp是函数，解法二的dp是数组
 * 
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence1 = function (text1, text2) {
    this.dp = function (i, j) {
        // 有一个字符串为空字符串
        if (i === -1 || j === -1) {
            return 0;
        }
        // 相等即找到一个lcs的字符，加1后继续向前查找
        if (text1[i] === text2[j]) {
            return this.dp(i - 1, j - 1) + 1;
        } else {
            // 没有找到lcs字符，则判断是移动哪个指针能使lcs更长
            return Math.max(this.dp(i - 1, j), this.dp(i, j - 1), this.dp(i - 1, j - 1));
        }
    }
    // 从后往前遍历
    return this.dp(text1.length - 1, text2.length - 1);
};

const text1 = 'abcde';
const text2 = 'ace';
console.log(longestCommonSubsequence1(text1, text2));

/**
 * 解法二：
 * 用dp表格优化解法一，优化时间复杂度
 * 
 * 1、dp数组
 * 定义dp 数组, 是一个二维数组，m+1行，n+1列的 ，都初始化为0；
 * dp[i][j] 的含义是：对于 text1[1..i] 和 text2[1..j] ， 它们的 LCS ⻓度是 dp[i][j]
 * 
 * 2、 base case
 * 让索引为 0 的⾏和列表⽰空串，dp[0][..] 和 dp[..][0] 都为 0（因为初始化时数组的元素都为0了）
 * 
 * 3、选择，状态转移
 * 选择：
 * 两层循环从前往后遍历dp二维数组，选择即两种：当前的元素dp[i]和dp[j]要么相等（即在lcs中），要么不相等（其中一个不在lcs，或都不在lcs中）
 *
 * 状态的改变：
 * i和j从1开始 从前往后遍历 text1 和 text2，
 * 如果 text1[i]==text2[j]，那么这个字符⼀定在 lcs 中，更新dp，即状态的改变
 * 否则text1[i] 和 text2[j] 这两个字符⾄少有⼀个不在 lcs 中，
 * 则继续找哪一个能让lcs更长
 *
 * 状态转移方程
 * 在lcs中，dp[i][j] = 1 + dp[i - 1][j - 1];
 * 不在lcs中，dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
 *
 * 
 * 时间复杂度O(n*m)
 * 空间复杂度O(n*m)
 * 
 * @param {*} text1 
 * @param {*} text2 
 */
var longestCommonSubsequence2 = function (text1, text2) {
    const m = text1.length;
    const n = text2.length;

    // 定义二维数组m+1行，n+1列，都初始化为0
    // base case为dp[0][...] 和 dp[...][0]
    const dp = [];
    for (let i = 0; i < m + 1; i++) {
        dp[i] = [];
        for (let j = 0; j < n + 1; j++) {
            dp[i][j] = 0;
        }
    }

    console.log(dp);

    // 进行状态转移，从前往后遍历
    for (let i = 1; i < m + 1; i++) {
        for (let j = 1; j < n + 1; j++) {
            // 找到1个 lcs 的元素，然后继续往前找
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                // 这里没有比较dp[i-1][j-1],因为它在三者中三最小的，没有必要比较
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    console.log(dp);
    // 最后一个元素即为结果
    return dp[m][n];
};
console.log(longestCommonSubsequence2(text1, text2));
