/**
 * 557. 反转字符串中的单词 III
 * 简单
 * https://leetcode.cn/problems/reverse-words-in-a-string-iii/
 * 
 * 解法：字符串
 */
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
    let result = '';

    let i = 0;

    // 遍历遇到空格则进行翻转
    for (let j = 0; j < s.length; j++) {
        if (s[j] == ' ') {
            result += reverse(s.substring(i, j)) + ' ';
            i = j + 1;
        }
    }

    // 最后一个空格后的单词，此时也需要翻转
    result += reverse(s.substring(i));

    return result;
};

var reverse = function (s) {
    let t = '';
    for (let j = s.length - 1; j >= 0; j--) {
        t += s[j];
    }
    return t;
}