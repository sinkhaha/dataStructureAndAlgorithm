/**
 * 
 * 645. 错误的集合
 * 
 * 简单
 * 
 * 解法类似448题
 * 
 * @param {number[]} nums
 * @return {number[]}
 */
var findErrorNums = function(nums) {
    let n = nums.length;
    let result = [];
    let dup = -1;
    for (let i = 0; i < n; i++) {
        const newIndex = Math.abs(nums[i]) - 1;
        if (nums[newIndex] > 0) {
            nums[newIndex] = nums[newIndex] * -1;
        } else {
            result.push(Math.abs(nums[i]));
        }
    }

    for (let i = 0; i < n; i++) {
        if (nums[i] > 0) {
            result.push(i + 1);
        }
    }
    return result;
};
const nums = [2, 2];
console.log(findErrorNums(nums)); // [2, 3]
