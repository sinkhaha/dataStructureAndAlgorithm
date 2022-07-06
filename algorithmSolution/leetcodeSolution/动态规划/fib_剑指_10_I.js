/**
 * 剑指 Offer 10- I. 斐波那契数列
 * 简单
 * https://leetcode.cn/problems/fei-bo-na-qi-shu-lie-lcof/
 * 
 * 解法：动态规划 自上而下推导
 * 
 * 时间o(n)
 * 空间o(1)
 */
/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
    if (n == 0 || n == 1) {
        return n;
    }

    let left = 0; // 初始为f(0)的值
    let right = 1;// 初始为f(1)的值
    let sum = 0;

    for (let i = 2; i <= n; i++) {
        sum = (left + right) % 1000000007;

        left = right;
        right = sum;
    }

    return sum;
};