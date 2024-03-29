
// 题目 leetcode 496 简单 下一个更大元素 I
// https://leetcode-cn.com/problems/next-greater-element-i/
// 
// 给定两个 没有重复元素 的数组 nums1 和 nums2 ，其中nums1 是 nums2 的子集。
// 找到 nums1 中每个元素在 nums2 中的下一个比其大的值。
// 
// (nums1 中数字 x 的下一个更大元素是指 x 在 nums2 中对应位置的右边的
// 第一个比 x 大的元素。如果不存在，对应位置输出 -1 )
// 
// 示例 1:
// 输入: nums1 = [4,1,2], nums2 = [1,3,4,2].
// 输出: [-1,3,-1]
// 解释:
//     对于num1中的数字4，你无法在第二个数组中找到下一个更大的数字，因此输出 -1。
//     对于num1中的数字1，第二个数组中数字1右边的下一个较大数字是 3。
//     对于num1中的数字2，第二个数组中没有下一个更大的数字，因此输出 -1。

/**
 * 下一个更大元素
 * @param {*} nums1 
 * @param {*} nums2 
 * 
 * 单调递减栈
 * 
 * 思路：
 * 忽略数组 nums1，先对将 nums2 中的每一个元素，求出其下一个更大的元素，
 * 将映射关系存于哈希表中，key是nums2的元素，value是当前key的下一个更大的元素，
 * 最后遍历数组 nums1，可直接在哈希表中找到结果
 *
 * 具体实现：
 * 1. 维护了一个单调递减栈，栈中的元素从栈底到栈顶的值是从大到小的
 * 2. 遍历nums2数组，当遍历到一个新的元素 nums2[i] 时，判断栈顶元素是否小于 nums2[i]，
 * 如果是，那么栈顶元素的下一个更大元素即为 nums2[i]，我们将栈顶元素出栈保存到哈希表。
 * 重复这一操作，直到栈为空或者栈顶元素大于 nums2[i]。此时我们将 nums2[i] 入栈，
 * 保持栈的单调性，并对接下来的 nums2[i + 1], nums2[i + 2] ... 执行同样的操作。
 *
 * 时间复杂度：O(M+N)，其中 M 和 N 分别是数组 nums1 和 nums2 的长度。
 * 空间复杂度：O(N)
 */
var nextGreaterElement = function(nums1, nums2) {
    let map = new Map();
    let stack = [];
    for (let n2 of nums2) {
        while (stack.length && n2 > stack[stack.length - 1]) {
            // 说明比前一个元素(即stack.pop()元素)大，存入哈希表中
            map.set(stack.pop(), n2);
        }
        stack.push(n2);
    }

    // 因为是子集，直接取值即可
    return nums1.map(n1 => {
        return map.get(n1) || -1;
    });
};

const nums1 = [2, 4];
const nums2 = [1, 2, 3, 4]
console.log(nextGreaterElement(nums1, nums2));
