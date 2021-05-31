/**
 * 88. 合并两个有序数组
 * https://leetcode-cn.com/problems/merge-sorted-array/
 * 
 * 双指针，从后往前
 * 
 * 
 * 
 * 其他题意相关题目 
 * 23. 合并K个升序链表mergeKLists  https://leetcode-cn.com/problems/merge-k-sorted-lists/
 * 21. 合并两个有序链表 mergeTwoLists
 * 
 * 时间复杂度 : O(n + m)
 * 空间复杂度 : O(1)
 *
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    let p1 = m - 1; // 指向nums1的尾部
    let p2 = n - 1; // 指向nums2的尾部
    let p = m + n - 1;

    while ((p1 >= 0) && (p2 >= 0)) {
        nums1[p--] = nums1[p1] > nums2[p2]
           ? nums1[p1--]
           : nums2[p2--];        
   }  

    // nums2还有剩余，则需要把它替换掉nums1前面的元素
    if (p2 >= 0) {
       nums1.splice(0, p2 + 1, ...nums2.slice(0, p2 + 1));
    }
};
