/**
 * leetcode 1 两数之和 findTarget
 * 
 * 题目：给定一个整数数组 nums 和一个目标值 target，
 *      请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标
 * 
 * 例如：
 * 给定 nums = [2, 7, 11, 15], target = 9
 * 因为 nums[0] + nums[1] = 2 + 7 = 9
 * 所以返回 [0, 1]
 * 
 * 前提：给定数据无序
 * 
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // 解法一：hashmap解法  时间复杂度O(n)  空间复杂度O(n)
    // key为值，value为数组下标，
    // 每次循环时判断和当前数相加等于目标值的数字是否在hash里面，是就返回
    let hashMap = new Map();
    for (let i = 0; i < nums.length; i++) {
        const another = target - nums[i];
        const isContain = hashMap.has(another);
        if (isContain) {
            return [hashMap.get(another), i];
        }
        hashMap.set(nums[i], i);
    }

    // 解法二：暴力解法,两层循环  时间复杂度O(n^2)， 空间复杂度O(1)
    //   for (let i=0; i<nums.length; i++) {
    //     for (let j=i+1; j<nums.length; j++) {
    //       if (target === nums[j] + nums[i]) {
    //         return [i, j];  
    //       }
    //     }  
    //   }
    throw new Error('找不到');
};

const nums = [2, 11, 7, 15];
const target = 18;
console.log(twoSum(nums, target)); // [1, 2]
