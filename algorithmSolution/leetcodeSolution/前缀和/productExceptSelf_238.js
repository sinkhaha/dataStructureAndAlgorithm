/**
 * 238. 除自身以外数组的乘积
 * 中等
 * https://leetcode.cn/problems/product-of-array-except-self/
 * 
 * 解法：前缀和
 * 
 * 时间O(N) 
 * 空间O(1)
 */
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
    let n = nums.length;

    // leftArr[i]表示i左侧所有数字的乘积，leftArr[i] = leftArr[i-1] * nums[i-1]
    let leftArr = new Array(n);

    leftArr[0] = 1; // 0索引左侧没有数字，所以可以为1，任何数乘以1都不变

    for (let i = 1; i < n; i++) {
        leftArr[i] = leftArr[i - 1] * nums[i - 1];
    }

    let r = 1;
    for (let i = n - 1; i >= 0; i--) {
        leftArr[i] = leftArr[i] * r; // 左侧 * 右侧
        r = r * nums[i];
    }

    return leftArr;
};