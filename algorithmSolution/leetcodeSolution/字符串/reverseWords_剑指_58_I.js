/**
 * 剑指 Offer 58 - I. 翻转单词顺序
 * 简单
 * https://leetcode.cn/problems/fan-zhuan-dan-ci-shun-xu-lcof/
 * 
 */
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
    if (!s) {
        return s;
    }

    const arr = s.trim().split(' ');

    let result = [];
    for (let item of arr) {
        if (!item) {
            continue;
        }
        result.push(item);
    }

    return result.reverse().join(' ');
};