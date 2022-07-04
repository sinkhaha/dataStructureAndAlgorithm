/**
 * 剑指 Offer II 107. 矩阵中的距离
 * 中等
 * https://leetcode.cn/problems/2bCMpM/
 * 
 * 解法：动态规划
 * 
 */
/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (matrix) {
    let m = matrix.length;
    let n = matrix[0].length;

    // 初始化动态规划的数组，所有的距离值都设置为一个很大的数
    let dist = Array.from(new Array(m), () => new Array(n).fill(Number.MAX_SAFE_INTEGER / 2));

    // 如果 (i, j) 的元素为 0，那么距离为 0
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (matrix[i][j] == 0) {
                dist[i][j] = 0;
            }
        }
    }

    // 只有 水平向左移动 和 竖直向上移动，注意动态规划的计算顺序
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (i - 1 >= 0) {
                dist[i][j] = Math.min(dist[i][j], dist[i - 1][j] + 1);
            }
            if (j - 1 >= 0) {
                dist[i][j] = Math.min(dist[i][j], dist[i][j - 1] + 1);
            }
        }
    }

    // 只有 水平向左移动 和 竖直向下移动，注意动态规划的计算顺序
    for (let i = m - 1; i >= 0; --i) {
        for (let j = 0; j < n; ++j) {
            if (i + 1 < m) {
                dist[i][j] = Math.min(dist[i][j], dist[i + 1][j] + 1);
            }
            if (j - 1 >= 0) {
                dist[i][j] = Math.min(dist[i][j], dist[i][j - 1] + 1);
            }
        }
    }

    // 只有 水平向右移动 和 竖直向上移动，注意动态规划的计算顺序
    for (let i = 0; i < m; ++i) {
        for (let j = n - 1; j >= 0; --j) {
            if (i - 1 >= 0) {
                dist[i][j] = Math.min(dist[i][j], dist[i - 1][j] + 1);
            }
            if (j + 1 < n) {
                dist[i][j] = Math.min(dist[i][j], dist[i][j + 1] + 1);
            }
        }
    }

    // 只有 水平向右移动 和 竖直向下移动，注意动态规划的计算顺序
    for (let i = m - 1; i >= 0; --i) {
        for (let j = n - 1; j >= 0; --j) {
            if (i + 1 < m) {
                dist[i][j] = Math.min(dist[i][j], dist[i + 1][j] + 1);
            }
            if (j + 1 < n) {
                dist[i][j] = Math.min(dist[i][j], dist[i][j + 1] + 1);
            }
        }
    }

    return dist;
};