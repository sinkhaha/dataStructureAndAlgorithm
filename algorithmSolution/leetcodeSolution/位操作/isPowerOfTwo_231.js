/**
 * 231 2的幂
 * https://leetcode-cn.com/problems/power-of-two/
 * 
 * 给定一个整数，编写一个函数来判断它是否是 2 的幂次方
 */
/**
 * 
 * 如果一个数字是2的幂必然只有一位是1，其他位数都是0
 * 
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function (n) {
    return (n > 0) && ((n & (n - 1)) == 0);
};

const n = 18;
console.log(isPowerOfTwo(n));
