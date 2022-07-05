/**
 * 剑指 Offer 57 - II. 和为s的连续正数序列
 * 简单
 * https://leetcode.cn/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof/
 * 
 * 解法：双指针
 */
/**
 * @param {number} target
 * @return {number[][]}
 */
var findContinuousSequence = function (target) {
    let i = 1; // 左指针
    let j = 2; // 右指针

    let sum = 3; // 元素和

    let res = [];

    while (i < j) {
        if (sum == target) { // 窗口内的元素和 等于目标值，则记录序列，并左指针向右移
            let ans = [];
            for (let k = i; k <= j; k++) {
                ans[k - i] = k;
            }
            res.push(ans);

            // 左指针右移
            sum -= i;
            i++;
        } else if (sum > target) { // 大于目标值，则左指针向右移动，缩小窗口
            sum -= i;
            i++;
        } else { // 小于目标值，则右指针向右移动，扩大窗口
            j++;
            sum += j;
        }
    }

    return res;
};