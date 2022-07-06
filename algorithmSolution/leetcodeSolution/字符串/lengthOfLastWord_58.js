/**
 * 58. 最后一个单词的长度
 * 简单
 * https://leetcode.cn/problems/length-of-last-word/
 * 
 * 解法：字符串
 * 时间O(n) 
 * 空间O(1)
 */
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
    // 从后往前定位到最后单词的最后一个字符，然后往前遍历直到空格停下
    let count = 0;

    let index = s.length - 1;
    while (index > 0 && s[index] === ' ') {
        index--;
    }

    while (index >= 0 && s[index] !== ' ') {
        count++;
        index--;
    }

    return count;
};