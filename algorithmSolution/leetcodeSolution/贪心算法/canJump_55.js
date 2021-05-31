/**
 * 55. 跳跃游戏
 * 中等
 * https://leetcode-cn.com/problems/jump-game/
 */
/**
 * 贪心算法
 * 
 * 时间复杂度O(n)
 * 空间复杂度O(1)
 * 
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
    let n = nums.length;
    if (n === 0) {
        return false;
    }

    let farthest = 0;
    // 计算当前位置能跳的最远距离
    for (let i = 0; i < n - 1; i++) {
        // i + nums[i] 表示当前在i位置的距离，加上在该位置可以跳的距离
        farthest = Math.max(farthest, i + nums[i]);
        // 该位置的最远距离 <= i, 说明nums[i]可能是0，永远无法跳到最后
        if (farthest <= i) {
            return false;
        }
    }

    return true;
};

const nums = [3, 2, 1, 0, 4];
console.log(canJump(nums));
