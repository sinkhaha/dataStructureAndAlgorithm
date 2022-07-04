/**
 * 剑指 Offer II 018. 有效的回文
 * 简单
 * https://leetcode.cn/problems/XltzEq/
 * 
 * 解法：双指针
 * 
 * 时间O(n) 
 * 空间O(1)
 */
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
    // 去掉非数字或字母的字符
    s = s.replace(/[^0-9a-zA-Z]/g, '').toLocaleLowerCase();

    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        if (s[left] != s[right]) {
            return false;
        }
        left++;
        right--;
    }

    return true;
};