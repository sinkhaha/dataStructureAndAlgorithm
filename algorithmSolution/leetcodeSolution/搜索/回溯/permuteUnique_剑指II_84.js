/**
 * 剑指 Offer II 084. 含有重复元素集合的全排列 
 * 中等
 * https://leetcode.cn/problems/7p8L0Z/
 * 
 * 解法：回溯
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
    let n = nums.length;
    if (n == 0) {
        return [];
    }

    let visited = new Array(n).fill(false);

    // 排序 减枝得关键
    nums.sort((a, b) => parseInt(a) - parseInt(b));

    const trackback = (track) => {
        if (track.length == n) {
            result.push(track.slice());
            return;
        }

        for (let i = 0; i < n; i++) {
            if (visited[i]) {
                continue;
            }

            // 对原数组排序，保证相同的数字都相邻
            // 然后每次填入的数一定是这个数所在重复数集合中“从左往右第一个未被填过的数字”
            if (i > 0 && nums[i] == nums[i - 1] && !visited[i - 1]) {
                continue;
            }

            track.push(nums[i]);
            visited[i] = true;

            trackback(track);

            track.pop();
            visited[i] = false;
        }
    }

    let result = [];
    let track = [];

    trackback(track);

    return result;
};