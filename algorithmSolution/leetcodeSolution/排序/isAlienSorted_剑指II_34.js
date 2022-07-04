/**
 * 剑指 Offer II 034. 外星语言是否排序
 * 简单
 * https://leetcode.cn/problems/lwyVBB/
 * 
 * 解法：排序
 */
/**
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */
var isAlienSorted = function (words, order) {
    // 按照给定的字母表order 的顺序，检测给定的字符串数组是否按照order 的字典升序排列

    const ACHARCODEAT = 'a'.charCodeAt(); // 97

    const arr = new Array(26).fill(0); // arr[i]表示字符在字母表order的序号
    for (let i = 0; i < order.length; ++i) {
        arr[order[i].charCodeAt() - ACHARCODEAT] = i;
    }

    for (let i = 1; i < words.length; ++i) {
        let len1 = words[i - 1].length;
        let len2 = words[i].length;

        let valid = false;

        // 第i 和第i-1 的单词一位一位比较    
        for (let j = 0; j < len1 && j < len2; ++j) {
            let preChar = arr[words[i - 1][j].charCodeAt() - ACHARCODEAT];
            let curChar = arr[words[i][j].charCodeAt() - ACHARCODEAT];
            if (preChar < curChar) {
                valid = true;
                break;
            } else if (preChar > curChar) {
                return false;
            }
        }
        if (!valid) {
            // 比较两个字符串的长度
            if (words[i - 1].length > words[i].length) {
                return false;
            }
        }
    }


    return true;
};