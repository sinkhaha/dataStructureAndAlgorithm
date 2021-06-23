/**
 * leetcode 15 三数之和
 * https://leetcode-cn.com/problems/3sum/
 * 
 * 题目：
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，
 * 使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
 * 注意：答案中不可以包含重复的三元组。
 *
 * 解法：排序 + 双指针
 * 
 * 时间复杂度：O(N^2) , N 是数组的长度。
 * 空间复杂度：O(log N)
 * 
 * @param {number[]} nums
 * @return {number[][]}
 */
function threeSum(nums) {
    let n = nums.length;
    if (n < 3) {
        return [];
    }

    // 从小到大排序，不能用默认sort(), 需要先parsetInt转换
    nums = nums.sort((a, b) => {
        return parseInt(a) - parseInt(b);
    });
    console.log(`排序后 ${nums}`);

    let results = [];
    for (let i = 0; i < n; i++) {
        // 和上一次的数相同直接跳过
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }

        let third = n - 1;

        for (let second = i + 1; second < n; second++) {
            // 和上一次的数相同直接跳过
            if (second > i + 1 && nums[second] === nums[second - 1]) {
                continue;
            }
            // 需要保证 second 的指针在 third 的指针的左侧
            // 大于指定数0，则最大指针向前移动减小
            while (second < third && nums[i] + nums[second] + nums[third] > 0) {
                third--;
            }
            // 第second和第third个指针重合，退出
            if (second == third) {
                break;
            }

            if (nums[i] + nums[second] + nums[third] == 0) {
                results.push([nums[i], nums[second], nums[third]]);
            }
        }
    }
    return results;
};

const nums = [-1, 0, 1, 2, -1, -4];
console.log(`原数组 ${nums}`);
console.log(threeSum(nums));
