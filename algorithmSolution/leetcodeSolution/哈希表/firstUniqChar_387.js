/**
 * @param {string} s
 * @return {number}
 */
/**
 * 387. 字符串中的第一个唯一字符
 * 简单
 * https://leetcode.cn/problems/first-unique-character-in-a-string/
 * 
 * 解法：哈希表
 */
/**
 * 
 * @param {*} s 
 * @returns 
 */
var firstUniqChar = function (s) {
    let n = s.length;
    if (n == 0) {
        return -1;
    }

    let map = new Map();
    for (let item of s) {
        map.set(item, map.get(item) ? map.get(item) + 1 : 1);
    }

    for (let i = 0; i < n; i++) {
        if (map.get(s[i]) == 1) {
            return i;
        }
    }

    return -1;

};