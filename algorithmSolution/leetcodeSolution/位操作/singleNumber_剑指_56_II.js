/**
 * 剑指 Offer 56 - II. 数组中数字出现的次数 II
 * 中等
 * https://leetcode.cn/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-ii-lcof/
 * 
 * 解法：位运算
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {

    // 因为数组中只有一个数出现了一次，那么（各个二进制位为1的个数 % 3） 便能求出这个数哪些位置为1， 最后再将其转换为十进制

    let counts = new Array(32).fill(0); // 32表示4个字节即32位

    // 统计所有数字的各二进制位的 1 的出现次数
    for (let num of nums) {
        for (let j = 0; j < 32; j++) {
            counts[j] += num & 1; // 与运算，都为1才为1
            num >>>= 1; // 第 j 位 --> 第 j + 1 位
        }
    }

    // 没看懂
    let res = 0;
    let m = 3;
    for (let i = 0; i < 32; i++) {
        res <<= 1; // 左移1位
        res |= counts[31 - i] % m; // 恢复第 i 位的值到 res
    }
    return res;
};