/**
 * 剑指 Offer 17. 打印从1到最大的n位数
 * 简单
 * https://leetcode.cn/problems/da-yin-cong-1dao-zui-da-de-nwei-shu-lcof/
 * 
 * 解法：数学
 */
/**
 * @param {number} n
 * @return {number[]}
 */
var printNumbers = function (n) {
    // 考规律 时间和空间都是O(n)
    // n为1时，最大位数为 10^1 - 1 = 9
    // n为2时，最大位数为 10^2 - 1 = 99
    // n为3时，最大位数为 10^3 - 1 = 999
    // 所以最大位数为10^n - 1

    const max = Math.pow(10, n) - 1;
    let result = new Array(max);

    for (let i = 0; i < max; i++) {
        result[i] = i + 1;
    }

    return result;
};