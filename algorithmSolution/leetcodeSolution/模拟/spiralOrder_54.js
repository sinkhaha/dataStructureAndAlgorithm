/**
 * 54. 螺旋矩阵
 * 中等
 * https://leetcode.cn/problems/spiral-matrix/
 * 
 * 解法：矩阵 + 模拟
 */
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
    if (matrix.length == 0) {
        return [];
    }

    let l = 0; // 左
    let r = matrix[0].length - 1; // 右
    let t = 0; // 上
    let b = matrix.length - 1; // 下

    let x = 0;
    let res = new Array((r + 1) * (b + 1));

    while (true) {
        for (let i = l; i <= r; i++) {
            res[x++] = matrix[t][i]; // 从左向右遍历
        }
        if (++t > b) {
            break;
        }

        for (let i = t; i <= b; i++) {
            res[x++] = matrix[i][r]; // 从上向下遍历
        }
        if (l > --r) {
            break;
        }

        for (let i = r; i >= l; i--) {
            res[x++] = matrix[b][i]; // 从右向左遍历
        }
        if (t > --b) {
            break;
        }

        for (let i = b; i >= t; i--) {
            res[x++] = matrix[i][l]; // 从下向上遍历
        }
        if (++l > r) {
            break;
        }
    }

    return res;
};