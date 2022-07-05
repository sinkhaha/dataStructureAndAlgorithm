/**
 * 剑指 Offer II 004. 只出现一次的数字 
 * 中等
 * https://leetcode.cn/problems/WGki4K/
 * 
 * 解法：位运算
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
    let ans = 0;
    for (let i = 0; i < 32; ++i) {
        let total = 0;
        for (const num of nums) {
            total += ((num >> i) & 1);
        }
        if (total % 3 != 0) {
            ans |= (1 << i);
        }
    }
    return ans;
};
