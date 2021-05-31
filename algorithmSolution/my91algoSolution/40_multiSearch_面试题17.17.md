## 题目
**面试题 17.17. 多次搜索**

>中等

给定一个较长字符串big和一个包含较短字符串的数组smalls，设计一个方法，根据smalls中的每一个较短字符串，对big进行搜索。输出smalls中的字符串在big里出现的所有位置positions，其中positions[i]为smalls[i]出现的所有位置。

示例：
```
输入：
big = "mississippi"
smalls = ["is","ppi","hi","sis","i","ssippi"]
输出： [[1,4],[8],[],[3],[1,4,7,10],[5]]
```
提示：

* 0 <= len(big) <= 1000
* 0 <= len(smalls[i]) <= 1000
* smalls的总字符数不会超过 100000。
* 你可以认为smalls中没有重复字符串。
* 所有出现的字符均为英文小写字母。

>来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/multi-search-lcci
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
## 解法：前缀树

### 思路
* 对smalls`每个字符串建立Trie前缀树`，记录每个字符串在数组的位置
* 遍历big字符串，截取big长度为smalls中最长的子串，然后判断是否在Trie中，是的话则
把索引存到result结果数组中

### 代码
```js
/**
 * trie节点
 * @param {*} val 
 */
function TreeNode() {
    this.children = {};
    // 是否是字符串结尾
    this.isEnd = false;
    // 单词在smalls数组中的位置
    this.index = -1;
}

/**
 * trie
 */
var Trie = function () {
    this.root = new TreeNode();
    // 记录trie当前已经插入的字符串的个数
    this.count = 0;
}

/**
 * trie插入
 * @param {*} word 
 */
Trie.prototype.insert = function (word) {
    if (!word) {
        return;
    }

    let node = this.root;
    for (let char of word) {
        if (!node.children[char]) {
            node.children[char] = new TreeNode();
        }
        node = node.children[char];
    }

    node.index = this.count;
    node.isEnd = true;
    this.count++;
}
/**
 * trie树查找
 * @param {*} word 
 */
Trie.prototype.search = function (word) {
    if (!word) {
        return false;
    }

    let node = this.root;
    for (let char of word) {
        if (node.children[char] == undefined) {
            return false;
        }
        node = node.children[char];
    }
    return node.isEnd;
}

/**
 * 以prefix开头的字符串是否在trie中
 * @param {*} prefix 
 */
Trie.prototype.startsWith = function (prefix) {
    if (!prefix) {
        return false;
    }

    let node = this.root;
    for (let char of prefix) {
        if (node.children[char] == undefined) {
            return false;
        } 
        node = node.children[char];
    }

    return true;
};

/**
 *
 * @param {string} big
 * @param {string[]} smalls
 * @return {number[][]}
 */
var multiSearch = function (big, smalls) {
    let result = Array(smalls.length).fill(0).map(() => []);

    // smails中字符串的最长长度
    let maxLength = Math.max(...smalls.map(small => small.length));

    let trie = new Trie();

    // 将smalls每个字符串插入树中
    smalls.forEach(v => trie.insert(v));

    for (let i = 0; i < big.length; i++) {
        // 不以 big[i] 开头的字符串
        if (!trie.startsWith(big[i])) {
            continue;
        }

        let str = big.slice(i, i + maxLength);

        let node = trie.root;
        for (let char of str) {
            if (!node.children[char]) {
                break;
            }
            node = node.children[char];
            
            // 能在trie中找到big的子字符串，即smalls中有字符串在big中出现
            if (node.isEnd) {
                result[node.index].push(i);
            }
        }
    }

    return result;
};
```

### 复杂度
* 时间复杂度：O(M*(N+K)) ，insert是NM，search是KM
* 空间复杂度：O(NM) 前缀树的节点数
>N是smallers的长度，M是smallers中子串的最长长度， K是big的长度
