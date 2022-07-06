/**
 * 剑指 Offer 14- II. 剪绳子 II
 * 中等
 * https://leetcode.cn/problems/jian-sheng-zi-ii-lcof/
 * 
 * 解法：贪心
 * 参考 https://leetcode.cn/problems/jian-sheng-zi-ii-lcof/solution/jian-zhi-offer-14-ii-jian-sheng-zi-iihua-r5op/
 *
 * 时间O(n) 
 * 空间O(1)
 */
/**
 * @param {number} n
 * @return {number}
 */
var cuttingRope = function (n) {
    // 贪心算法 不同于https://leetcode.cn/problems/jian-sheng-zi-lcof/

    if (n == 1) {
        return 0;
    }
    if (n == 2) {
        return 1;
    }
    if (n == 3) {
        return 2;
    }

    let res = 1;
    while (n > 4) { // 分成尽可能多的长度为3的小段
        res = res * 3 % 1000000007;
        n = n - 3;
    }

    // 最后剩下的n不够3，可能是2或者1，所以还需要相乘
    return res * n % 1000000007;
};