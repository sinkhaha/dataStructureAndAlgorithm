/**
 * 11. 盛最多水的容器
 * 中等
 * https://leetcode.cn/problems/container-with-most-water/
 * 
 * 解法：双指针 分别指向首尾
 * S = (j - i) * Min(height[i], heigth[j])，
 * 
 * 
 * 时间 O(n)
 * 空间 O(1)
 */
/**
 * 
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
    let i = 0;
    let j = height.length - 1;
    let res = 0;

    // 双指针相遇时停下
    while (i < j) {
        if (height[i] < height[j]) {
            res = Math.max(res, (j - i) * height[i]);
            i++;
        } else {
            res = Math.max(res, (j - i) * height[j]);
            j--;
        }
    }

    return res;
};