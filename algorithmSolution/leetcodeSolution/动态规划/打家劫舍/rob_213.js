/**
 * 213. 打家劫舍 II (和198题的区别是这里的nums是一个首尾相连的圈)
 * 中等
 * 
 * https://leetcode-cn.com/problems/house-robber-ii/
 * 
 * ⾸尾房间不能同时被抢，那么只可能有三种不同情况：
 * 1.要么都不被抢；
 * 2.要么第⼀间房⼦被抢最后⼀间不抢；
 * 3.要么最后⼀间房⼦被抢第⼀间不抢。
 * 
 * 其实我们不需要⽐较三种情况，只要⽐较情况⼆和情况三就⾏了，
 * 因为这两种情况对于房⼦的选择余地⽐情况⼀⼤呀，房⼦⾥的钱数都是⾮负数，
 * 所以选择余地⼤，最优决策结果肯定不会⼩。
 * 
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
    let n = nums.length;
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return nums[0];
    }
    
    // 仅计算闭区间 [start,end] 的最优结果
    this.dp = function (nums, start, end) {
        let dp_i_1 = 0;
        let dp_i_2 = 0;
        let dp_i = 0; 

        for (let i = end; i >= start; i--) {
            dp_i = Math.max(
                dp_i_1, 
                nums[i] + dp_i_2
            ); 
            dp_i_2 = dp_i_1; 
            dp_i_1 = dp_i; 
        }
              
        return dp_i;
    }

    return Math.max(
        dp(nums, 0, n - 2), // 第1间抢，最后1间不抢
        dp(nums, 1, n - 1) // 第1间不抢，最后1间抢
    );
};
const nums = [2, 3, 2];
console.log(rob(nums)); // 3
