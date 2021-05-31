/**
 * 172. 阶乘后的零
 * 给定一个整数 n，返回 n! 结果尾数中零的数量。
 * 
 * 简单
 * https://leetcode-cn.com/problems/factorial-trailing-zeroes/
 * 
 * 因为两个数相乘结果末尾有 0，一定是两个数中有因子 2 和 5，因为 10 = 2 x 5
 * 
 * 所以问题可以初步转化为：
 * n! 最多可以分解出多少个因子 2 和 5
 * 继续转化为：
 * n! 最多可以分解出多少个因子 5
 * 
 * 比如 n = 25，那么 25! 最多可以分解出几个 2 和 5 相乘？
 * 这个主要取决于能分解出几个因子 5，因为每个偶数都能分解出因子 2，
 * 因子 2 肯定比因子 5 多得多。
 *
 * 例如 25! 中
 * 5 可以提供1个
 * 10 可以提供1个
 * 15 可以提供1个
 * 20 可以提供1个，
 * 25 可以提供2个
 * 总共有 6 个因子 5，
 * 所以 25! 的结果末尾就有 6 个 0
 * 
 * 注意点：
 * 像 25，50，75 这些 25 的倍数，可以提供2个因子 5
 * 像 125，250 这些 125 的倍数，可以提供3个因子 5
 * 
 * 如 125! 可以分解出 20 + 5 + 1 = 26 个因子 5，所以阶乘结果的末尾有 26 个 0
 * 
 * 
 * 时间复杂度 O(logN)
 * 空间复杂度 O(1)
 * 
 * @param {number} n
 * @return {number}
 */
var trailingZeroes1 = function(n) {
    let res = 0;
    // 除数
    let divisor = 5;

    while (divisor <= n) {
        res += Math.floor(n / divisor);
        divisor *= 5;
    }

    return res;
};

// 解法一的简化
var trailingZeroes2 = function(n) {
    let res = 0;
    for (let d = n; Math.floor(d / 5) > 0; d = Math.floor(d / 5)) {
        res += Math.floor(d / 5);
    }
    return res;
};

const n = 5;
console.log(trailingZeroes1(n)); // 1
console.log(trailingZeroes2(n)); // 1