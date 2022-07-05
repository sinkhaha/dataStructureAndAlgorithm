/**
 * 326. 3 的幂
 * 简单
 * https://leetcode.cn/problems/power-of-three/
 * 
 * 解法：试除法
 * 
 * 时间O(logn) 
 * 空间O(1)
 */
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfThree = function (n) {
    // 试除法：不断除以3，直到1，如果过程中无法被3整除，说明不是3的幂
    while (n != 0 && n % 3 == 0) {
        n = Math.floor(n / 3);
    }

    return n == 1;
};