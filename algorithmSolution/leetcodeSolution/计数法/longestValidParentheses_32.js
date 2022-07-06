/**
 * 32. 最长有效括号
 * 困难
 * 
 * https://leetcode.cn/problems/longest-valid-parentheses/
 * 
 * 解法：计数法
 * 参考官方题解
 * 
 * 时间 O(n)
 * 空间 O(1)
 */
/**
 * 
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
    let left = 0;
    let right = 0;

    let maxRst = 0;

    // 从左向右遍历
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            left++;
        } else {
            right++;
        }
        // 左右括号的个数相等，计算长度
        if (left === right) {
            maxRst = Math.max(maxRst, 2 * left);
        } else if (right > left) { // 右边括号多于左括号，则重新从下一个字符开始计算
            left = right = 0;
        }
    }

    left = right = 0;
    // 从右向左遍历
    for (let i = s.length - 1; i >= 0; i--) {
        if (s[i] === '(') {
            left++;
        } else {
            right++;
        }

        if (left === right) {
            maxRst = Math.max(maxRst, 2 * left);
        } else if (left > right) {
            left = right = 0;
        }
    }

    return maxRst;
};