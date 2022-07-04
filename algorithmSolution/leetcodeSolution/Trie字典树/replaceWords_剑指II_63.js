/**
 * 剑指 Offer II 063. 替换单词
 * 中等
 * https://leetcode.cn/problems/UhWRSj/
 * 
 * 解法：字典树
 */
/**
 * @param {string[]} dictionary
 * @param {string} sentence
 * @return {string}
 */
var replaceWords = function (dictionary, sentence) {
    // 把词跟插入前缀树中
    let trie = new Trie();
    for (let word of dictionary) {
        trie.insert(word);
    }

    // 判断继承词是否在前缀树中存在前缀，是的话直接替换
    let arr = sentence.split(' ');
    for (let i = 0; i < arr.length; i++) {
        let prefix = trie.findPrefix(arr[i]);
        if (prefix !== '') {
            arr[i] = prefix;
        }
    }
    return arr.join(' ');
};


// 前缀树类
class Trie {
    constructor() {
        this.map = new Map();
    }
    insert(word) {
        let node = this.map;
        for (let ch of word) {
            if (node.get(ch) == undefined) {
                node.set(ch, new Map())
            }
            node = node.get(ch);
        }
        node.isEnd = true;
    }
    findPrefix(word) {
        let node = this.map;
        let arr = [];
        for (let ch of word) {
            if (node.get(ch) == undefined || node.isEnd) {
                break;
            }
            arr.push(ch);
            node = node.get(ch);
        }
        return node.isEnd ? arr.join('') : '' // 注意必须在只有在isEnd的时候返回 其他情况返回空字符串

    }
};