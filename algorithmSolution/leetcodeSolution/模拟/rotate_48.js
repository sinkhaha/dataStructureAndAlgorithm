/**
 * 48. 旋转图像
 * 中等
 * https://leetcode.cn/problems/rotate-image/
 * 
 * 参考 https://leetcode.cn/problems/rotate-image/solution/48-xuan-zhuan-tu-xiang-fu-zhu-ju-zhen-yu-jobi/
 *
 * 时间O(N^2)
 * 空间O(1) 
 */
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
    let n = matrix.length;

    // 由外向内，一圈圈旋转
    // 一轮可以完成矩阵 4 个元素的旋转。因而，只要分别以矩阵左上角 1/4 的各元素为起始点执行以上旋转操作，即可完整实现矩阵旋转
    for (let i = 0; i < Math.floor(n / 2); i++) {
        for (let j = 0; j < Math.floor((n + 1) / 2); j++) {
            let tmp = matrix[i][j]; // 比如例1的 1

            matrix[i][j] = matrix[n - 1 - j][i]; // 比如例1的 7换到1的位置
            matrix[n - 1 - j][i] = matrix[n - 1 - i][n - 1 - j]; // 比如例1的 9换到7的位置
            matrix[n - 1 - i][n - 1 - j] = matrix[j][n - 1 - i]; // 比如例1的 3换到9的位置

            matrix[j][n - 1 - i] = tmp; // 比如例1的 1换到3的位置
        }
    }
};