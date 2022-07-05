/**
 * 73. 矩阵置零
 * 中等
 * https://leetcode.cn/problems/set-matrix-zeroes/
 * 
 * 解法：哈希表 + 矩阵
 * 
 * 时间O(mn) 
 * 空间O(1)
 */
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
    // 用矩阵的第一行和第一列代替方法一中的两个标记数组，以达到 O(1)的空间，
    // 但这样会导致原数组的第一行和第一列被修改，无法记录它们是否原本包含 0。
    // 因此需要额外使用两个标记变量分别记录第一行和第一列是否原本包含 0
    let m = matrix.length;
    let n = matrix[0].length;

    let flagRow0 = false; // 标识第1行是否有0
    let flagCol0 = false; // 标识第1列是否有0

    for (let i = 0; i < m; i++) {
        if (matrix[i][0] == 0) {
            flagCol0 = true; // 注意：这里要用列
            break;
        }
    }

    for (let i = 0; i < n; i++) {
        if (matrix[0][i] == 0) {
            flagRow0 = true;
            break;
        }
    }

    // 用第1行和第1列标识有哪些行和列是有出现0
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] == 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            // 说明i行，或者j列有出现0
            if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                matrix[i][j] = 0;
            }
        }
    }

    if (flagRow0) { // 第1行有0，则全部设置为0
        for (let i = 0; i < n; i++) { // 注意：这里是n，n是列
            matrix[0][i] = 0;
        }
    }

    if (flagCol0) { // 第1列有0，则全部设置为0
        for (let i = 0; i < m; i++) {
            matrix[i][0] = 0;
        }
    }


};