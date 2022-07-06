/**
 * 剑指 Offer 13. 机器人的运动范围
 * 中等
 * https://leetcode.cn/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof/
 * 
 * 解法：dfs
 */
/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var movingCount = function (m, n, k) {
    // 标记当前格子是否被访问过
    const visited = Array.from(new Array(m), () => new Array(n).fill(false));

    return dfs(visited, m, n, k, 0, 0);
};

/**
 *
 */
const dfs = function (visited, m, n, k, i, j) {
    if (i >= m || j >= n || (bitSum(i) + bitSum(j) > k) || visited[i][j]) {
        return 0;
    }

    visited[i][j] = true;

    // 当前格 + 往下走 + 往右走
    return 1 + dfs(visited, m, n, k, i + 1, j) + dfs(visited, m, n, k, i, j + 1);
}

/**
 * 数位之和计算
 */
const bitSum = function (x) {
    let sum = 0;
    while (x != 0) {
        sum += x % 10;
        x = Math.floor(x / 10);
    }

    return sum;
}