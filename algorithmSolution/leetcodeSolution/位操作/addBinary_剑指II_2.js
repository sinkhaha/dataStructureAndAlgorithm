/**
 * 剑指 Offer II 002. 二进制加法
 * 简单
 * https://leetcode.cn/problems/JFETK5/
 * 
 * 解法：位运算
 */
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
    // 位运算 
    // 参考官方题解

    let x = parseInt(a, 2); // x保存结果 
    let y = parseInt(b, 2); // y保存进位

    let answer;
    while (y) {
        answer = x ^ y; // 当前x和y的无进位结果
        carry = (x & y) << 1; // 当前x和y的进位

        x = answer;
        y = carry;
    }

    return x.toString(2); // 十进制转二进制
};