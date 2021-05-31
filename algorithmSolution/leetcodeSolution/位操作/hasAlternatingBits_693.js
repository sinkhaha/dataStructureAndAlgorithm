/**
 * 693 交替位二进制数
 * https://leetcode-cn.com/problems/binary-number-with-alternating-bits/
 * 
 * 判断一个数字的二进制是不是01交替的
 * 
 * 找规律
 * n                01010101  (1)
 *
 * n>>1             00101010  (2)
 *
 * n + n>>1         01111111  (3)
 *
 * n + n>>1 + 1     10000000  (4)
 *
 * (3) & (4) 等于0
 * 
 * 
 * @param {number} n
 * @return {boolean}
 */
var hasAlternatingBits = function(n) {
    return ((n + (n >> 1) + 1) & (n + (n >> 1))) == 0;
};

const n = 7;
console.log(hasAlternatingBits(n));
