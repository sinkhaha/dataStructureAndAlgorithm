/**
 * leetcode 516. 最长回文子序列
 * 中等
 */
/**
 * 动态规划
 * 
 * 1. dp数组的定义
 * dp[i][j]：表示⼦串 s[i..j]的最⻓回⽂⼦序列的⻓度
 * 
 * dp[i][j]的结果可以由dp[i+1][j-1]的结果推出来；
 *
 * 已知dp[i+1][j-1]的话；
 * 当i=j即当前两个字符相等，所以需要dp[i+1][j-1]加上2，即dp[i][j]=dp[i+1][j-1] + 2
 * 当i!=j即当两个字符不相等时，需要分别求出s[i+1...j]和s[i..j-1]哪个回⽂⼦序列更⻓，即dp[i][j] = max(dp[i + 1][j], dp[i][j - 1])
 * 
 * 2. 选择和状态
 * 由第1步可知选择为为s[i]和s[j]时，dp[i][j]即状态会变化
 * 状态转移方程为
 * dp[i][j] = dp[i + 1][j - 1] + 2 (当i==j)
 * dp[i][j] = max(dp[i + 1][j], dp[i][j - 1]) (当i!=j)
 *
 * 3. base case基本情况
 * 如果s只有一个字符,只能构成一个回文子序列，即最长长度为1，也就是dp[i][j] = 1 (i==j)，即dp二维数组对角线都为1
 * 
 * 时间复杂度O(N^2) N为s的长度
 * 空间复杂度O(N^2)
 * 
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function(s) {
    let n = s.length;

    const dp = [];
    for (let i = 0; i < n; i++) {
        dp[i] = [];
        for (let j = 0; j < n; j++) {
            // base case 当i==j时，dp[i][j]为1，1个字符,其他元素都初始化为0
            if (i === j) {
                dp[i][j] = 1;
            } else {
                dp[i][j] = 0;
            }
        }
    }

    console.log(dp);

    // 从下往上，反着遍历
    for (let i = n - 1; i >= 0; i--) {
        for (let j = i + 1; j < n; j++) {
            // 选择，对应的状态改变
            if (s[i] === s[j]) {
                dp[i][j] = dp[i+1][j-1] + 2;
            } else {
                dp[i][j] = Math.max(dp[i+1][j], dp[i][j-1]);
            }
        }
    }
    
    // 二维数组右上角的元素即为所求结果
    return dp[0][n-1];
};

const s = 'bbbab';
console.log(longestPalindromeSubseq(s)); // 4
