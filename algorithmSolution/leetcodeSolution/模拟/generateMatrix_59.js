/**
 * 59. 螺旋矩阵 II
 * 中等
 * https://leetcode.cn/problems/spiral-matrix-ii/
 * 
 * 解法：矩阵 + 模拟
 */
/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
    let l = 0; // 左
    let r = n - 1; // 右
    let t = 0; // 上
    let b = n - 1; // 下

    // n行n列的矩阵
    let matrix = Array.from(new Array(n), () => new Array(n));

    let num = 1;
    let endNum = n * n;

    while (num <= endNum) {
        for (let i = l; i <= r; i++) { // 从左向右遍历
            matrix[t][i] = num++;
        }
        t++;

        for (let i = t; i <= b; i++) { // 从上向下遍历
            matrix[i][r] = num++;
        }
        r--;

        for (let i = r; i >= l; i--) { // 从右向左遍历
            matrix[b][i] = num++;
        }
        b--;

        for (let i = b; i >= t; i--) { // 从下向上遍历
            matrix[i][l] = num++;
        }
        l++;
    }

    return matrix;
};