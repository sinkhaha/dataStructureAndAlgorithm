/**
 * 算法常⽤操作 n&(n-1)
 * 作⽤:消除数字 n 的⼆进制表⽰中的最后⼀个 1
 */
/**
 * leetcode 461. 汉明距离
 * 
 * 简单
 * https://leetcode-cn.com/problems/hamming-distance/
 * 
 * 利用先异或，然后n&(n-1)
 * 
 * 时间复杂度：O(1)
 * 空间复杂度：O(1)
 * 
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function (x, y) {
    // 异或，相同为0，不同为1，此时含有1的个数即为不同的个数
    let result = x ^ y;

    let countOne = 0;
    while (result !== 0) {
        // （n & (n-1)）可以消除n最后一个1，一直到n为0为止
        result = result & (result - 1);
        countOne++;
    }
    return countOne;
};