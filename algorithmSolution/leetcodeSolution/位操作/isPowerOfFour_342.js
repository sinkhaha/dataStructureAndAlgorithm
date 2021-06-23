/**
 * 342 4的幂
 * 
 * 简单
 * https://leetcode-cn.com/problems/power-of-four/
 */
/**
 * 
 * 位运算解法
 * 
 * 时间复杂度：O(1)
 * 空间复杂度：O(1)
 * 
 * @param {*} num 
 */
var isPowerOfFour = function (num) {
    // 4的幂必然也是2的幂，且1永远在奇数位上，奇数位都是1的值的16进制是0x55555555
    return (num > 0) && ((num & (num - 1)) == 0) && (num & 0x55555555) == num;
};

console.log(isPowerOfFour(16));