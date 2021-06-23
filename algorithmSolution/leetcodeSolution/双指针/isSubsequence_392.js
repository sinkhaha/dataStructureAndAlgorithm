/**
 * 392. 判断子序列
 * 
 * 简单
 * https://leetcode-cn.com/problems/is-subsequence/
 * 
 * 双指针
 * 
 * 时间复杂度O(n)
 * 空间复杂度O(1)
 * 
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
    let i = 0, j = 0;

    // i指针指向s，j指针指向t
    while (i < s.length && j < t.length) {
        if (s[i] == t[j]) {
            i++;
        }
        j++;
    }

    return i == s.length;
};

const s = 'abc', t = 'ahbgdc';
console.log(isSubsequence(s, t)); // true
