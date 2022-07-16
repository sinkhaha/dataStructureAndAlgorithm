/**
 * leetcode 37 解数独
 * 困难
 * https://leetcode-cn.com/problems/sudoku-solver/
 * 
 * 数独：
 * 行只有1-9，不会重复
 * 列只有1-9，不会重复
 * 3乘3的小块也是只有1-9，不会重复
 * 
 * 
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board) {
    if (board.length === 0) {
        return [board];
    }

    /**
     * 
     * @param {*} board 
     * @param {*} i 行
     * @param {*} j 列
     */
    this.backtrack = function (board, i, j) {
        let m = 9;
        let n = 9;

        // 穷举到最后一列的话就换到下一行重新开始
        if (j == n) {
            return this.backtrack(board, i + 1, 0);
        }

        // r == m 说明穷举完了最后一行，完成了所有的穷举
        // 找到一个可行解,返回 true 阻止后续的递归
        if (i == m) {
            return true;
        }

        // 如果该位置是预设的数字，则跳过该列，进行下一个数的填充
        if (board[i][j] != '.') {
            return this.backtrack(board, i, j + 1);
        }

        for (let ch = 1; ch <= 9; ch++) {
            // 如果遇到不合法的数字，就跳过
            if (!isValid(board, i, j, ch)) {
                continue;
            }

            // 做选择
            board[i][j] = ch.toString();

            // 对下一个数进行填充，如果找到一个可行解，立即结束
            if (this.backtrack(board, i, j + 1)) {
                return true;
            }

            // 撤销选择
            board[i][j] = '.';
        }

        // 穷举完 1-9，依然没有找到可行解，此路不通
        return false;
    }

    // 从第一个点开始找，找到一个结果即返回
    if (this.backtrack(board, 0, 0)) {
        return board;
    }
};

/**
 * 判断 board[r][c] 是否可以填入 n
 * 
 * @param {*} board 
 * @param {*} r 行
 * @param {*} c 列
 * @param {*} n 要填入的数字
 */
function isValid(board, r, c, n) {
    for (let i = 0; i < 9; i++) {
        // 判断行是否存在重复
        if (board[r][i] == n) {
            return false;
        }
        // 判断列是否存在重复
        if (board[i][c] == n) {
            return false;
        }

        let ii = Math.floor((r / 3)) * 3 + Math.floor(i / 3);
        let jj = Math.floor((c / 3)) * 3 + Math.floor(i % 3);
        // console.log(`i = ${i} r=${r} c=${c} ii=${ii}, jj=${jj}`);
        
        // 判断 3 x 3 方框是否存在重复
        if (board[ii][jj] == n) {
            return false;
        }
    }
    return true;
}

const board = [
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"]
];
const boards = 
[[".","8","7","6","5","4","3","2","1"],["2",".",".",".",".",".",".",".","."],["3",".",".",".",".",".",".",".","."],["4",".",".",".",".",".",".",".","."],["5",".",".",".",".",".",".",".","."],["6",".",".",".",".",".",".",".","."],["7",".",".",".",".",".",".",".","."],["8",".",".",".",".",".",".",".","."],["9",".",".",".",".",".",".",".","."]]
console.log(solveSudoku(boards));
