/**
 * 118. 杨辉三角
 * 简单
 * https://leetcode.cn/problems/pascals-triangle/
 * 
 * 解法：数组
 */
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
    // 杨辉三角的性质：第n行的第i个数 = 第n-1行的第i-1个数和第i个数之和
    const ret = [];

    for (let i = 0; i < numRows; i++) {
        // 初始化当前行，第1行1个元素，第2行2个元素，... 第n行n个元素
        const row = new Array(i + 1).fill(1);

        // 计算第i行每个元素的值
        for (let j = 1; j < row.length - 1; j++) {
            row[j] = ret[i - 1][j - 1] + ret[i - 1][j];
        }

        ret.push(row);
    }

    return ret;
};