/**
 * 190. 颠倒二进制位
 * 简单
 * https://leetcode.cn/problems/reverse-bits/
 * 
 * 解法：位运算
 */
/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function (n) {
    let ret = 0;
    for (let i = 0; i < 32; i++) {
        ret <<= 1;
        ret += (n & 1);
        n >>= 1;
    }
    return ret >>> 0;
};