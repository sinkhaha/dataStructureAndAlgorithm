/**
 * 448. 找到所有数组中消失的数字
 * 
 * 简单
 * 
 * 
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
    let n = nums.length;
    
    // nums的元素为下标，把对应元素变为负
    for (let i = 0; i < n; i++) {
        const newIndex = Math.abs(nums[i]) - 1;
        if (nums[newIndex] > 0) {
            nums[newIndex] = nums[newIndex] * -1;
        }
    }

    console.log(nums);

    // 找到不为负数的元素，说明nums中没有元素等于此下标
    let result = [];
    for (let i = 1; i <= n; i++) {
        if (nums[i - 1] > 0) {
            result.push(i);
        }
    }

    return result;
};
const nums = [4, 3, 2, 7, 8, 2, 3, 1];
console.log(findDisappearedNumbers(nums)); // [5, 6]
