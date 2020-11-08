/**
 * 136. 只出现一次的数字
 * 
 * 简单
 */
/**
 * 
 * 利用 n^n=0，n^0=n
 * 
 * 时间复杂度O(n)
 * 
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
    let result = 0;

    for (let num of nums) {
        result ^= num;
    }
    
    return result;
};
const nums = [1, 1, 2, 3, 3, 4, 4];
console.log(singleNumber(nums));