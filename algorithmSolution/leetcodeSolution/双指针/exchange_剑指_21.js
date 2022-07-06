/**
 * 剑指 Offer 21. 调整数组顺序使奇数位于偶数前面
 * 简单
 * https://leetcode.cn/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/
 * 
 * 解法：双指针
 */
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var exchange = function (nums) {
    // 双指针，0到left指针的值都是奇数，left + 1到right之间的值都是偶数
    let left = 0;
    let right = 0;

    for (let i = 0; i < nums.length; i++) {
        // 偶数，则右指针移动
        if (nums[right] % 2 == 0) {
            right++;
        } else {
            // right是奇数，则把它跟left的值交换，然后两个指针同时向右移动
            let temp = nums[left];
            nums[left] = nums[right];
            nums[right] = temp;
            left++;
            right++;
        }
    }

    return nums;
};