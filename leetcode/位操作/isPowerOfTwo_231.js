/**
 * 231 2的幂
 */
/**
 * 
 * 如果一个数字是2的幂必然只有一位是1，其他位数都是0
 * 
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function(n) {
    return (n > 0) && ((n & (n - 1)) == 0);
};

const n = 18;
console.log(isPowerOfTwo(n));
