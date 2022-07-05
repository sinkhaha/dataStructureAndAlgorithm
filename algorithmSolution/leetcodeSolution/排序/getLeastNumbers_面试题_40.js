/**
 * 面试题40. 最小的k个数
 * 简单
 * https://leetcode.cn/problems/zui-xiao-de-kge-shu-lcof/
 */
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function (arr, k) {
    arr.sort((a, b) => parseInt(a) - parseInt(b));
    return arr.slice(0, k);
};