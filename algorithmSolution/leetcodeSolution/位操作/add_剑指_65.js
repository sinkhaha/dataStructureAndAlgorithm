/**
 * 剑指 Offer 65. 不用加减乘除做加法
 * 简单
 * https://leetcode.cn/problems/bu-yong-jia-jian-cheng-chu-zuo-jia-fa-lcof/
 * 
 * 解法：位运算
 */
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var add = function (a, b) {
    // 位运算
    while (b != 0) { // 当进位为0时跳出
        let c = (a & b) << 1;  // c为进位
        a ^= b; // a为非进位和
        b = c; // b为进位
    }
    return a;
};