/**
 * leetcode 78 子集
 * https://leetcode-cn.com/problems/subsets/
 * 
 * 回溯算法
 * 
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
    let res = [];
    
    this.backtrack = function(nums, start, track) {
        // 不能直接res.push(track)，因为引用问题，所以要存拷贝后的值
        res.push(track.slice());

        for (let i = start; i < nums.length; i++) {
            // 做选择
            track.push(nums[i]);
            // 回溯
            this.backtrack(nums, i + 1, track);
            // 撤回选择
            track.pop();
        }
    }

    // 记录所做的选择
    const track = [];
    backtrack(nums, 0, track); 
    return res;
};

const nums = [1, 2, 3];
console.log(subsets(nums));
