/**
 * 240. 搜索二维矩阵 II
 * 中等
 * https://leetcode.cn/problems/search-a-2d-matrix-ii/
 * 
 * 解法： z字形查找 
 * 
 * 时间O(m+n) 
 * 空间O(1)
 */
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
    let m = matrix.length;
    let n = matrix[0].length;

    let x = 0;
    let y = n - 1;

    while (x < m && y >= 0) {
        if (matrix[x][y] == target) {
            return true;
        } else if (matrix[x][y] > target) {
            y--;
        } else {
            x++;
        }
    }

    return false;
};