/**
 * 剑指 Offer 29. 顺时针打印矩阵
 * 简单
 * https://leetcode.cn/problems/shun-shi-zhen-da-yin-ju-zhen-lcof/
 * 
 * 解法：模拟 + 矩阵 
 * 
 * 参考 https://leetcode.cn/problems/shun-shi-zhen-da-yin-ju-zhen-lcof/solution/mian-shi-ti-29-shun-shi-zhen-da-yin-ju-zhen-she-di/
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