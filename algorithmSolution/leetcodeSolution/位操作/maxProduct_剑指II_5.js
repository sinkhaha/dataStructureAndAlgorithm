/**
 * 剑指 Offer II 005. 单词长度的最大乘积
 * 中等
 * https://leetcode.cn/problems/aseY1I/
 * 
 * 解法：位运算
 * 
 * 时间O(L+n^2) 
 * 空间O(n)
 */
/**
 * @param {string[]} words
 * @return {number}
 */
var maxProduct = function (words) {
    // 两层遍历，依次判断每两个单词是否有公共字符

    // 使用位运算判断两个单词是否有公共字符，降低时间复杂度

    // 知识点：位掩码

    let n = words.length;
    let masks = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        const word = words[i];
        for (let j = 0; j < word.length; j++) {
            // 计算掩码
            masks[i] |= 1 << (word[j].charCodeAt() - 'a'.charCodeAt());
        }
    }

    let maxResult = 0;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if ((masks[i] & masks[j]) == 0) { // 没有公共字母
                maxResult = Math.max(maxResult, words[i].length * words[j].length);
            }
        }
    }

    return maxResult;
};