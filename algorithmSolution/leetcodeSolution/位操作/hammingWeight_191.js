/**
 * 191  位1的个数
 * 
 * 简单
 * https://leetcode-cn.com/problems/number-of-1-bits/
 */
/**
 * n & n-1 可以消掉二进制最右侧的一个1
 * 
 * 时间复杂度O(1)
 * 空间复杂度O(n)
 * 
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
    if (!n) {
        return 0;
    }

    let count = 0;
    while (n != 0) {
        n &= (n - 1);
        count++;
    }

    return count;
};

const n = 00000000000000000000000000001011;
console.log(hammingWeight(n)); // 3