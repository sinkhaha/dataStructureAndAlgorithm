/**
 * 剑指 Offer 50. 第一个只出现一次的字符
 * 简单
 * https://leetcode.cn/problems/di-yi-ge-zhi-chu-xian-yi-ci-de-zi-fu-lcof/
 * 
 * 解法：哈希表
 */
/**
 * @param {string} s
 * @return {character}
 */
var firstUniqChar = function (s) {
    if (!s) {
        return ' ';
    }
    const map = new Map();
    for (let c of s) {
        map.set(c, map.get(c) ? map.get(c) + 1 : 1);
    }

    for (let c of s) {
        if (map.get(c) === 1) {
            return c;
        }
    }

    return ' ';
};