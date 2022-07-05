/**
 * 13. 罗马数字转整数
 * 简单
 * https://leetcode.cn/problems/roman-to-integer/
 * 
 * 解法：哈希表
 */
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
    // 时间O(n) 空间O(1)
    const obj = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };

    let result = 0;
    // 一般是左边的大于右边的。当左边的小于右边的，需要特殊处理，直接取反即可
    for (let i = 0; i < s.length; i++) {
        const curValue = obj[s[i]];
        if (i < s.length - 1 && curValue < obj[s[i + 1]]) {
            result -= curValue;
        } else {
            result += curValue;
        }
    }

    return result;
};