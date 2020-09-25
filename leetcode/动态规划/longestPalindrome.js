
/**
 * 5 最长回文子串
 * 
 * 动态规划
 * 
 * 1、dp数组定义：
 * dp[i][j]表示[i..j]的字符串是回文串
 * 
 * 2、选择和状态
 * 选择为s[i]和s[j]时，dp[i][j]即状态会变化
 * 
 * 状态转移方程
 * 当s[i] !== s[j]，dp[i][j] = false 
 * 当s[i] === s[j]，dp[i][j] = dp[i + 1][j - 1] 或 dp[i][j] = true (j - i < 3)
 * 
 * 3、base case基本情况
 * 如果s只有一个字符,只能构成一个回文子序列，即最长长度为1，也就是dp[i][j] = true (i==j)，即dp二维数组对角线都为true
 * 
 * 时间复杂度 O(N^2)
 * 空间复杂度 O(N^2)
 * 
 * @param {*} s 
 */
function longestPalindrome(s) {
    let n = s.length;

    if (n < 2) {
        return s;
    }

    const dp = [];
    for (let i = 0; i < n; i++) {
        dp[i] = [];
        for (let j = 0; j < n; j++) {
            // base case 当i==j时，dp[i][j]为true，1个字符是回文,其他元素都初始化为false
            if (i === j) {
                dp[i][j] = true;
            } else {
                dp[i][j] = false;
            }
        }
    }

    // console.log(dp);

    let start = 0;
    let maxLength = 1;

    // 从下往上，从左到右
    for (let i = n - 1; i >= 0; i--) {
        for (let j = i + 1; j < n; j++) {
            // 选择，对应的状态改变
            if (s[i] !== s[j]) {
                dp[i][j] = false;
            } else {
                // [i..j]长度小于3一定是回文
                if (j - i < 3) {
                    dp[i][j] = true;
                } else {
                    dp[i][j] = dp[i + 1][j - 1];
                }
            }

            // dp[i][j] == true，表示子串 s[i..j] 是回文，记录回文长度和起始位置
            if (dp[i][j] === true && j - i + 1 > maxLength) {
                maxLength = j - i + 1;
                start = i;
            }
        }
    }

    return s.substring(start, start + maxLength);
}

/** =================================================================*/

/**
 * 解法二
 * 
 * 思路：从中间开始向两边扩散来判断回文串
 * 
 * 时间复杂度 O(N^2)
 * 空间复杂度 O(1)
 * 
 * @param {*} s 
 */
function longestPalindrome2(s) {
    let res = '';
    for (let i = 0; i < s.length; i++) {
        // 以s[i]为中心的最长回文串
        let s1 = palindrome(s, i, i);
        // 以s[i] 和 s[i+1] 为中心的最长回文串
        let s2 = palindrome(s, i, i + 1);
        // 找s1、s2和res的最长的回文串
        res = res.length > s1.length ? res : s1;
        res = res.length > s2.length ? res : s2;
    }
    return res;
}

/**
 * 寻找最长回文串
 * @param {*} s 
 * @param {*} l 
 * @param {*} r 
 */
function palindrome(s, l, r) {
    // 越界处理
    while (l >= 0 && r < s.length && s[l] === s[r]) {
        // 向两边扩散
        l--;
        r++;
    }
    // 返回以s[l]和s[r]为中心的最长回文串
    return s.substr(l + 1, r - l - 1);
}

function test() {
    const s = 'babad';
    console.log(longestPalindrome(s)); // aba
    console.log(longestPalindrome2(s));

}
test();

