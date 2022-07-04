/**
 * 剑指 Offer II 065. 最短的单词编码
 * 中等
 * https://leetcode.cn/problems/iSwD2y/
 * 
 * 解法：字典树
 */
/**
 * @param {string[]} words
 * @return {number}
 */
var minimumLengthEncoding = function (words) {
    // 前缀树
    let root = {};
    let result = 0;

    // 根据字符串长度 从大到小 排序
    words.sort((a, b) => {
        return b.length - a.length;
    });

    // 开始插入字符串，长的先插
    for (let word of words) {
        let flag = false;
        let cur = root;

        // 单词倒叙
        for (let i = word.length - 1; i >= 0; i--) {
            let s = word[i];

            // 说明前面没有出现相同后缀的单词
            if (!cur[s]) {
                cur[s] = {};
                flag = true; // 标记该元素不属于其他元素的后缀
            }
            cur = cur[s];
        }

        // 有flag说明这个单词是长的单词，不是短的单词，此时计算所有长的单词加上#号这个1个字符就是所求结果
        if (flag) {
            result += (word.length + 1);
        }
    }
    return result;
};