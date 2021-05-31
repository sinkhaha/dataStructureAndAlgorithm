/**
 * 
 * 645. 错误的集合
 * 
 * 简单
 * https://leetcode-cn.com/problems/set-mismatch/
 * 
 * 时间复杂度O(n)
 * 空间复杂度O(1)
 * 
 * 解法类似448题
 * 
 * @param {number[]} nums
 * @return {number[]}
 */
var findErrorNums = function(nums) {
    let n = nums.length;
    let result = [];

    // nums的元素为下标，把对应元素变为负
    for (let i = 0; i < n; i++) {
        const newIndex = Math.abs(nums[i]) - 1;
        if (nums[newIndex] > 0) {
            nums[newIndex] = nums[newIndex] * -1;
        } else {
            // 已经是负，说明该值重复
            result.push(Math.abs(nums[i]));
        }
    }

    // 正数为缺失的元素
    for (let i = 0; i < n; i++) {
        if (nums[i] > 0) {
            result.push(i + 1);
        }
    }
    return result;
};

const nums = [2, 2];
console.log(findErrorNums(nums)); // [2, 1]
