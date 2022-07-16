/**
 * leetcode 46 全排列
 * https://leetcode-cn.com/problems/permutations/
 * 
 * 返回一个数组的全排列
 * 
 * 回溯
 * 
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    let n = nums.length;
    if (n <= 1) {
        return [nums];
    }

    let res = [];

    this.backtrack = function (nums, track) {
        // 选择的列表满足全排列的个数，则加入结果集
        if (track.length === n) {
            // 不能直接res.push(track)，因为该引用的值会改变，需要存拷贝后的值
            res.push(track.slice());
            return;
        } 
        
        for (let i = 0; i < n; i++) {
            // 因为是全排列，该选择已经选择过的，可以跳过
            if (track.includes(nums[i])) {
                continue;
            }

            // 选择
            track.push(nums[i]);
            // 回溯
            this.backtrack(nums, track);
            // 撤回
            track.pop();
        }
    }

    let track = [];
    this.backtrack(nums, track);
    return res;
};

const nums = [1, 2, 3];
console.log(permute(nums));
