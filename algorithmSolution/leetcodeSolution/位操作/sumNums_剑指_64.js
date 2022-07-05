/**
 * 剑指 Offer 64. 求1+2+…+n
 * 中等
 * https://leetcode.cn/problems/qiu-12n-lcof/
 * 
 */
/**
 * @param {number} n
 * @return {number}
 */
var sumNums = function (n) {
    if (n <= 1) {
        return n;
    }

    let curIndex = 1;
    let sum = 0;

    while (curIndex < n) {
        sum += (n + 1);
        curIndex++;
    }

    return sum;
};