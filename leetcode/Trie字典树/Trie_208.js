/**
 * 208. 实现 Trie (前缀树)
 * 
 * 中等
 */
/**
 * Initialize your data structure here.
 */
var Trie = function () {
    this.root = {};
    // 结束标志
    this.isEnd = 1;
};

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
    let node = this.root;
    for (let char of word) {
        if (node[char] == undefined) {
            node[char] = {};
        }
        node = node[char];
    }
    // 为最后这个节点打上结束标志
    node.isEnd = this.isEnd;
};

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
    let node = this.root;
    for (let char of word) {
        if (node[char] == undefined) {
            return false;
        }
        node = node[char];
    }
    // 判断结束标志，没有结束标志可能只是前缀而不是一个单词
    return node.isEnd == this.isEnd;
};

/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
    let node = this.root;
    for (let char of prefix) {
        if (node[char] == undefined) {
            return false;
        }
        node = node[char];
    }
    return true;
};

var obj = new Trie();
const word = 'apple';
const prefix = 'app';
obj.insert(word);
console.log(JSON.stringify(obj.root));

var param_2 = obj.search(word);
var param_3 = obj.startsWith(prefix);
console.log(param_2, param_3);

