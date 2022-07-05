/**
 * 324. 摆动排序 II
 * 中等
 * https://leetcode.cn/problems/wiggle-sort-ii/
 * 
 * 解法：桶排序
 * 参考 https://leetcode.cn/problems/wiggle-sort-ii/solution/bai-dong-pai-xu-ii-by-jiang-hui-4-4tyk/
 * 
 * 时间O(n) 
 * 空间O(c) c为5001
 */
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var wiggleSort = function (nums) {

    const bucket = new Array(5001).fill(0);
    for (let num of nums) {
        bucket[num]++;
    }

    let j = 5000;
    // 插入较大元素到原数组中，插入到偶数位置
    for (let i = 1; i < nums.length; i += 2) {
        // 从后往前定位到 最大的元素
        while (bucket[j] == 0) {
            j--;
        }

        nums[i] = j;
        bucket[j]--; // 计数减1
    }

    // 插入较小元素
    for (let i = 0; i < nums.length; i += 2) {
        while (bucket[j] == 0) {
            j--;
        }

        nums[i] = j;
        bucket[j]--;
    }

};