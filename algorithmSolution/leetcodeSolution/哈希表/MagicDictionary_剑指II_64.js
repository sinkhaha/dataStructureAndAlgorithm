/**
 * 剑指 Offer II 064. 神奇的字典
 * 中等
 * https://leetcode.cn/problems/US1pGT/
 * 
 * 解法：哈希表
 */
/**
 * Initialize your data structure here.
 */
var MagicDictionary = function () {
    this.dict = new Set();
};

/** 
 * @param {string[]} dictionary
 * @return {void}
 */
MagicDictionary.prototype.buildDict = function (dictionary) {
    for (const w of dictionary) {
        this.dict.add(w);
    }
};

/** 
 * @param {string} searchWord
 * @return {boolean}
 */
MagicDictionary.prototype.search = function (searchWord) {
    // 逐个替换掉searchWord里的每个字母，看字典里是有有包含
    for (let i = 0; i < searchWord.length; i++) {
        const pre = searchWord.slice(0, i);
        const post = searchWord.slice(i + 1);

        // 26个字母
        for (let j = 97; j < 123; j++) {
            const c = String.fromCharCode(j);
            if (c === searchWord[i]) {
                continue;
            }

            if (this.dict.has(pre + c + post)) {
                return true;
            }
        }
    }

    return false;
};

/**
 * Your MagicDictionary object will be instantiated and called as such:
 * var obj = new MagicDictionary()
 * obj.buildDict(dictionary)
 * var param_2 = obj.search(searchWord)
 */