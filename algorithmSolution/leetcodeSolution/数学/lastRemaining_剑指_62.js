/**
 * 剑指 Offer 62. 圆圈中最后剩下的数字
 * 简单
 * https://leetcode.cn/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof/
 * 
 */
/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
var lastRemaining = function (n, m) {
    // 约瑟夫环
    let x = 0;
    for (let i = 2; i <= n; i++) {
        x = (x + m) % i;
    }
    return x;
};