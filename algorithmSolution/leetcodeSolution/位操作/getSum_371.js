/**
 * 371. 两整数之和
 * 简单
 * https://leetcode.cn/problems/sum-of-two-integers/
 * 
 * 解法：位运算
 * 
 */
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var getSum = function (a, b) {
    // 根据规律可以得出，a + b的问题拆分成求“a和b的无进位结果”与“a和b的进位结果”
    // 无进位加法可用 异或运算 得出
    // 有进位加法可用 与运算与左移 得出
    // 循环此过程，直到进位为0

    while (b != 0) {
        const carry = (a & b) << 1; // 进位
        a = a ^ b; // 无进位和
        b = carry; // b存进位
    }

    return a;
};