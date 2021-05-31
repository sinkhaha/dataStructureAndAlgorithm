/**
 * 724. 寻找数组的中心下标
 * 简单
 * 
 * https://leetcode-cn.com/problems/find-pivot-index/
 * 
 * 时间O(n)
 * 空间O(1)
 * 
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function(nums) {
    let total = nums.reduce((total, cur) => total + cur, 0);
    
    let preSum = 0;
    for (let i = 0; i < nums.length; i++) {
        // 左边之和等于右边之和
        if (preSum + nums[i] == total - preSum) { // 也可写成2 * preSum + nums[i] === total
            return i;
        }
        preSum += nums[i];
    }

    return -1;
};
