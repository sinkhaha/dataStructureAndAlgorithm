
/**
 * 79. 单词搜索
 * 
 * 中等
 * https://leetcode-cn.com/problems/word-search/
 */
/**
 * 深度优先搜索
 * 
 * 也可以参考212题，用trie+回溯
 * 
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
    const m = board.length;
    const n = board[0].length;

    // 方向数组
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    // 记录是否已访问标识
    const visited = new Array(m);
    for (let i = 0; i < visited.length; ++i) {
        visited[i] = new Array(n).fill(false);
    }

    /**
     * 
     * @param {*} i 当前节点的i下标
     * @param {*} j 当前节点的j下标
     * @param {*} s 要查找的单词
     * @param {*} k 要查找单词的字符索引
     */
    const check = (i, j, s, k) => {
        if (board[i][j] != s.charAt(k)) {
            return false;
        }

        // 查找到了单词
        if (k == s.length - 1) {
            return true;
        }

        visited[i][j] = true;

        let result = false;

        // board[i][j]的上下左右元素
        for (const [dx, dy] of directions) {
            let newi = i + dx;
            let newj = j + dy;

            if (newi >= 0 && newi < m && newj >= 0 && newj < n) {
                if (!visited[newi][newj]) {
                    const flag = check(newi, newj, s, k + 1);
                    if (flag) {
                        result = true;
                        break;
                    }
                }
            }
        }

        visited[i][j] = false;
        return result;
    }

    // 遍历二维数组
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const flag = check(i, j, word, 0);
            if (flag) {
                return true;
            }
        }
    }

    return false;
};

const board = [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E']
];
const word = "ABCCED";
console.log(exist(board, word));
