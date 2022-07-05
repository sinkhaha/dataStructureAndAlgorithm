/**
 * 289. 生命游戏
 * 中等
 * https://leetcode.cn/problems/game-of-life/
 * 
 * 解法：数组 + 模拟
 * 参考官方题解
 */
/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var gameOfLife = function (board) {
    let m = board.length;
    let n = board[0].length;

    let copyBoard = []; // 复制一份
    for (let i = 0; i < m; i++) {
        copyBoard[i] = [];
        for (let j = 0; j < n; j++) {
            copyBoard[i][j] = board[i][j];
        }
    }


    let neighbors = [0, 1, -1];

    // 遍历每个细胞
    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {

            // 对于每一个细胞统计其八个相邻位置里的活细胞数量
            let live = 0;

            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (!(neighbors[i] == 0 && neighbors[j] == 0)) {
                        let r = row + neighbors[i];
                        let c = col + neighbors[j];

                        // 查看相邻的细胞是否是活细胞
                        if ((r < m && r >= 0) && (c < n && c >= 0) && (copyBoard[r][c] == 1)) {
                            live += 1;
                        }
                    }
                }
            }

            // 规则 1 或规则 3      
            if ((copyBoard[row][col] == 1) && (live < 2 || live > 3)) {
                board[row][col] = 0;
            }

            // 规则 4
            if (copyBoard[row][col] == 0 && live == 3) {
                board[row][col] = 1;
            }
        }
    }
};