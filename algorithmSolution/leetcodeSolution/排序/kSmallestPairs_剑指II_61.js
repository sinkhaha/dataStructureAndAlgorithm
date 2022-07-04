/**
 * 剑指 Offer II 061. 和最小的 k 个数对
 * 中等
 * https://leetcode.cn/problems/qn8gGX/
 * 
 * 解法：暴力
 */
/**
 * 
 * @param {*} nums1 
 * @param {*} nums2 
 * @param {*} k 
 * @returns 
 */
var kSmallestPairs = function (nums1, nums2, k) {
    // 暴力解法
    // 遍历出所有数对，然后取前k个
    let arr = [];
    for (let i = 0; i < nums1.length; i++) {
        for (let j = 0; j < nums2.length; j++) {
            arr.push([nums1[i], nums2[j]]);
        }
    }

    return arr.sort((a, b) => (a[0] + a[1]) - (b[0] + b[1])).slice(0, k).map(a => [a[0], a[1]]);
};