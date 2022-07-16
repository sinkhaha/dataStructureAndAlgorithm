/**
 * 51. N 皇后
 * 困难
 * https://leetcode-cn.com/problems/n-queens/
 * 
 * 回溯算法
 * 此题是返回所有可能的结果
 * 
 * 跟52题类似，52题是返回可能的结果的数量
 *
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    let res = [];

    /**
     * 
     * @param {*} board 
     * @param {*} row 行
     */
    this.backtrack = function(board, row) {
        // 结束条件，row 超过 board 的最后一行
        if (row === board.length) {
            // board是二维数组，转成结果所要的形式
            board = board.map(one => {
                return one.join('');
            });
            res.push(board);
            return;
        }

        // 列
        let n = board[row].length;
        for (let col = 0; col < n; col++) {
            // 排除不合法选择
            if (!isValid(board, row, col)) {
                continue;
            }

            // 做选择
            board[row][col] = 'Q';
            // 进入下一行决策
            this.backtrack(board, row + 1);
            // 撤销选择
            board[row][col] = '.';
        }
    }

    // 棋盘的初始化, n行n列, 点表示空，Q表示皇后
    const board = new Array(n);
    for (let i = 0; i < n; i++) {     
        board[i] = new Array(n).fill('.');
    }
    
    this.backtrack(board, 0);
    return res;
};


/**
 * 是否可以在 board[row][col] 放置皇后
 * @param {*} board 
 * @param {*} row 行
 * @param {*} col 列
 */
const isValid = function(board, row, col) {
    let n = board.length;

    // 检查列是否有皇后互相冲突
    for (let i = 0; i < n; i++) {
        if (board[i][col] == 'Q') {
            return false;
        }
    }

    // 检查右斜线是否有皇后互相冲突
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
        if (board[i][j] == 'Q') {
            return false;
        }
    }

    // 检查左斜线是否有皇后互相冲突
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] == 'Q') {
            return false;
        }
    }

    return true;
}


const n = 4;
console.log(solveNQueens(n));