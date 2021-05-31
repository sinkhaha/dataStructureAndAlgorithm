/**
 * leetcode 剑指 Offer 04. 二维数组中的查找
 * 中等
 * 
 * https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/
 * 
 * 题目：
 * 在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，
 * 每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，
 * 判断数组中是否含有该整数。
 *
 * 现有矩阵 matrix 如下：
 * [
 *  [1,   4,  7, 11, 15],
 *  [2,   5,  8, 12, 19],
 *  [3,   6,  9, 16, 22],
 *  [10, 13, 14, 17, 24],
 *  [18, 21, 23, 26, 30]
 * ]
 * 给定 target = 5，返回 true。
 * 给定 target = 20，返回 false。
 *
 * 
 * 思路：
 *   因为数据有序，从二维数据的“右上角”元素开始查找，
 *    (1) 当前元素大于target时，则下边行的元素肯定大于target，所以往左边查找，列减一
 *    (2) 当前元素小于target时，则左边列的元素肯定下小于target，所以往下边查找，行加一
 *   一直到所有元素遍历结束
 * 
 *  时间复杂度：O(n+m)，访问到的下标的行最多增加 n 次，列最多减少 m 次，因此循环体最多执行 n + m 次
 *  空间复杂度O(1)
 * 
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function(matrix, target) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return false;
    }

    // 开始时指向右上角元素
    let row = 0; // 行指针
    let col = matrix[0].length - 1; // 列指针

    // 总行数
    let rowCount = matrix.length - 1;
    
    // 列指针向左移，行指针向下移
    while (row <= rowCount && col >= 0) {
        const cur = matrix[row][col];
        if (cur === target) {
            return true;
        }
        if (cur > target) {
            col--;
        } else {
            row++;
        }
    }

    return false;
};

const nums = [
    [1, 4, 7, 11, 15],
    [2, 5, 8, 12, 19],
    [3, 6, 9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30]
  ];
const target = 50;

console.log(findNumberIn2DArray(nums, target));


