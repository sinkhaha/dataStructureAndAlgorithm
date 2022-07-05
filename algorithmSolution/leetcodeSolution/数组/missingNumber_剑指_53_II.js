/**
 * 剑指 Offer 53 - II. 0～n-1中缺失的数字
 * 简单
 * https://leetcode.cn/problems/que-shi-de-shu-zi-lcof/
 * 
 * 解法：数组
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
    let n = nums.length;

    let arr = Array(n + 1).fill(0); // 下标即nums的数字，值为1
    for (let num of nums) {
        if (arr[num] == 0) {
            arr[num] = 1;
        }
    }

    for (let i = 0; i <= n; i++) {
        if (arr[i] !== 1) {
            return i;
        }
    }

};