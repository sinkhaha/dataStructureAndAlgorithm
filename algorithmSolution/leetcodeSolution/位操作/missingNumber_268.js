/**
 * 268. 缺失数字
 * 
 * 简单
 * https://leetcode-cn.com/problems/missing-number/
 * 
 * 异或运算：
 * 一个数和它本身做异或运算结果为 0，一个数和 0 做异或运算还是它本身
 * 
 * 把所有的元素和索引做异或运算，成对儿的数字都会消为 0，就会剩下这个缺失的元素
 * 
 * 时间复杂度 O(N)
 * 空间复杂度 O(1)
 * 
 * @param {number[]} nums
 * @return {number[]}
 */
var missingNumber = function (nums) {
    let n = nums.length;

    let res = 0;
    // 先和新补的索引异或一下
    res ^= n;

    // 和其他的元素、索引做异或
    for (let i = 0; i < n; i++) {
        res ^= i ^ nums[i];
    }

    return res;
};

// 用等差数列解法
var missingNumber2 = function (nums) {
    let n = nums.length;
    // 公式：(首项 + 末项) * 项数 / 2
    let expect = (0 + n) * (n + 1) / 2;

    let sum = 0;
    for (let x of nums) {
        sum += x;
    }

    return expect - sum;
}

const nums = [9, 6, 4, 2, 3, 5, 7, 0, 1];
console.log(missingNumber(nums)); // 8
console.log(missingNumber2(nums)); // 8
