/**
 * 130. 被围绕的区域
 * 中等
 * https://leetcode.cn/problems/surrounded-regions/
 * 
 * 解法：dfs
 * 
 * 时间O(mn) 
 * 空间O(mn)
 */
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function (board) {
    // 矩阵有字母O、被字母X包围的O、没有被字母X包围的O 这3种情况
    // 1、对每个边界上的O，以它为起点，标记与它直接或间接相连的O为#
    // 2、最后遍历整个矩阵，如果是被标记过的#，说明该位置时没被X包围的O，则还原为O；如果没被标记过，则修改为X

    if (!board || board.length == 0) {
        return null;
    }

    let m = board.length; // m行
    let n = board[0].length; // n列

    const dfs = (board, x, y) => {
        if (x < 0 || y < 0 || x >= m || y >= n || board[x][y] != 'O') { // 退出条件
            return;
        }

        board[x][y] = '#'; // 标记边缘的O为#号
        dfs(board, x - 1, y); // 左
        dfs(board, x + 1, y); // 右
        dfs(board, x, y - 1); // 上
        dfs(board, x, y + 1); // 下
    }

    // 标记 左边缘 和 右边缘 的O
    for (let i = 0; i < m; i++) {
        dfs(board, i, 0); // 左边缘
        dfs(board, i, n - 1); // 右边缘
    }

    // 标记 上边缘 和 下边缘 的O
    for (let i = 1; i < n - 1; i++) { // 注意范围[1, n - 1)，因为前面标记左右边缘时，把第1列和最后1列标记好了，不用重复标记
        dfs(board, 0, i);
        dfs(board, m - 1, i);
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] == '#') {
                board[i][j] = 'O'; // 还原边缘的O
            } else if (board[i][j] == 'O') {
                board[i][j] = 'X'; // 非边缘的O标记为X
            }
        }
    }

    return board;
};