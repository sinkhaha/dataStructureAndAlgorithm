/**
 * 139. 单词拆分
 * 中等
 * https://leetcode.cn/problems/word-break/
 * 
 * 解法：dfs
 * 参考https://leetcode.cn/problems/word-break/solution/shou-hui-tu-jie-san-chong-fang-fa-dfs-bfs-dong-tai/
 * 
 */
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
    // 指针start在s从0开始，从start后切开s，如果start前面的能在
    let sLength = s.length;

    let set = new Set(wordDict);

    // 备忘录剪枝 key是start, value是true或false; true表示从start后切开s, wordDict存在字符串能组合成s
    let memory = new Map();

    this.canFind = function (start) {
        // 指针越界了，此时说明s一步步划分子串完了，才走到这步，现在没有剩余子串了，所以能组成
        if (start == sLength) {
            return true;
        }

        if (memory.get(start) !== undefined) {
            return memory.get(start);
        }

        for (let i = start + 1; i <= sLength; i++) {
            const prefixStr = s.slice(start, i);

            // 前缀串是单词，判断后面的子串是否满足可以组成，递归
            if (set.has(prefixStr) && this.canFind(i)) {
                memory.set(start, true);
                return true;
            }
            // 如果前缀串不是单词，则继续下一轮迭代，再切出一个前缀串进行判断
        }

        memory.set(start, false);
        return false;
    }

    // 默认从0开始
    return this.canFind(0);
};