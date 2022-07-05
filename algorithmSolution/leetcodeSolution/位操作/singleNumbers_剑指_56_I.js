
/**
 * 剑指 Offer 56 - I. 数组中数字出现的次数
 * 中等
 * https://leetcode.cn/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-lcof/
 * 
 * 解法：位运算
 * 
 * 时间O(n) 
 * 空间O(1)
 */
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumbers = function (nums) {
    // 解法：异或分组
    // 把所有数字分成两组
    // (1)两个只出现一次的数字在不同的组中
    // (2)相同的数字会被分到相同的组中
    // 最后分别对两个子数组进行异或运算即可得到结果

    // 设最后结果所求的两个数分别是x和y
    // 1、对所有数字进行异或，最终得到x和y异或的结果，即为n，即n = x^y
    // 2、接下来对nums进行分组，先找到n中任意一个为1的位

    let n = 0;
    for (let num of nums) { // 异或 相同为0 不同为1
        n = n ^ num;
    }

    // 在异或结果n中找到任意一个为 1 的位 
    let m = 1;
    while ((n & m) == 0) {  // 循环左移
        m <<= 1;
    }

    // 拆分成两个数组
    let x = 0;
    let y = 0;
    for (let num of nums) {
        if ((num & m) != 0) {  // 与运算，根据这一位(m)，对所有的数字进行分组；都为1时，与运算才为1；nums中相同的数会被分到同一个子数组中
            x ^= num;
        } else {
            y ^= num;
        }
    }

    return [x, y];
};