/**
 * 344. 反转字符串
 * 简单
 * https://leetcode.cn/problems/reverse-string/
 * 
 * 解法：双指针
 */
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
    let n = s.length;
    let left = 0;
    let right = n - 1;

    while (left < right) {
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }

    return s;
};