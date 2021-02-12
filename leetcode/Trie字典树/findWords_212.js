
/**
 * 字典树类 即208题
 */
class Trie {
    constructor() {
        this.root = {};
        // 结束标志
        this.isEnd = 1;
    }

    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (node[char] == undefined) {
                node[char] = {};
            }
            node = node[char];
        }
        // 为最后这个节点打上结束标志
        node.isEnd = this.isEnd;
    }

    search(word) {
        let node = this.root;
        for (let char of word) {
            if (node[char] == undefined) {
                return false;
            }
            node = node[char];
        }
        // 判断结束标志，没有结束标志可能只是前缀而不是一个单词
        return node.isEnd == this.isEnd;
    }

    startsWith(prefix) {
        let node = this.root;
        for (let char of prefix) {
            if (node[char] == undefined) {
                return false;
            }
            node = node[char];
        }
        return true;
    }
}

/**
 * 212. 单词搜索 II
 * 
 * 困难
 * 
 * 解法：
 * 回溯 + 字典树
 * 
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (board, words) {
    if (!board || !words || board.length == 0 || words.length == 0) {
        return [];
    }

    /**
     * 穷举所有结果
     * @param {*} board 
     * @param {*} visited 访问标识数组
     * @param {*} str 访问过的字符组合
     * @param {*} x 当前节点的x坐标
     * @param {*} y 当前节点的x坐标
     * @param {*} trie 
     */
    this.dfs = function (board, visited, str, x, y, trie) {
        // 越界
        if (x < 0 || x >= board.length || y < 0 || y >= board[0].length) {
            return;
        }

        if (visited[x][y]) {
            return;
        }

        str += board[x][y];

        // 不是前缀直接返回即可
        if (!trie.startsWith(str)) {
            return;
        }

        // 在字典树中即符合结果
        if (trie.search(str)) {
            res.add(str);
        }
        visited[x][y] = true;

        // 从当前节点的前后左右四个方向遍历
        this.dfs(board, visited, str, x - 1, y, trie);
        this.dfs(board, visited, str, x + 1, y, trie);
        this.dfs(board, visited, str, x, y - 1, trie);
        this.dfs(board, visited, str, x, y + 1, trie);

        // 把x,y恢复成未读状态，继续返回上一层
        visited[x][y] = false;
    }

    // 符合的结果
    let res = new Set();

    // 把需要匹配的每单词存在字典树
    const trie = new Trie();
    for (let word of words) {
        trie.insert(word);
    }
    console.log(`trie是 ${JSON.stringify(trie)}`);

    let m = board.length;
    let n = board[0].length;

    // 初始化二维数组，默认false
    // 当前二维数组里的字符是否访问过标识
    const visited = [];
    for (let i = 0; i < m; i++) {
        visited[i] = [];
        for (let j = 0; j < n; j++) {
            visited[i][j] = false;
        }
    }

    console.log('visited是', visited);

    // 遍历board二维数组，把符合的结果存起来
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            this.dfs(board, visited, '', i, j, trie);
        }
    }

    // 转成数组返回
    return Array.from(res);
};

const words = ["oath", "pea", "eat", "rain"];
const board = [
    ['o', 'a', 'a', 'n'],
    ['e', 't', 'a', 'e'],
    ['i', 'h', 'k', 'r'],
    ['i', 'f', 'l', 'v']
];
console.log(findWords(board, words));
