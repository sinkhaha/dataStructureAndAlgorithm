/**
 * 剑指 Offer 58 - II. 左旋转字符串
 * 简单
 * https://leetcode.cn/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof/
 */
/**
 * @param {string} s
 * @param {number} n
 * @return {string}
 */
var reverseLeftWords = function (s, n) {
    if (!s || s.length == 1) {
        return s;
    }

    return s.substring(n, s.length) + s.substring(0, n);
};