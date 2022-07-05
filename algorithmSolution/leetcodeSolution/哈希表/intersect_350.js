/**
 * 350. 两个数组的交集 II
 * 简单
 * https://leetcode.cn/problems/intersection-of-two-arrays-ii/
 * 
 * 解法：哈希表
 * 
 * 时间O(n) 
 * 空间O(n)
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
    let n1 = nums1.length;
    let n2 = nums2.length;

    let numsShort;
    let numsLong;
    if (n1 < n2) {
        numsShort = nums1;
        numsLong = nums2;
    } else {
        numsShort = nums2;
        numsLong = nums1;
    }

    // 把短的数组计数
    let map = new Map();
    for (let num of numsShort) {
        map.set(num, map.get(num) ? map.get(num) + 1 : 1);
    }

    // 遍历长的，如果在短的中出现，则加入结果
    let result = [];
    let index = 0; // 结果数组索引

    for (let item of numsLong) {
        let numCount = map.get(item) || 0;
        if (numCount && numCount > 0) {
            result[index] = item;
            index++;
            numCount -= 1;

            if (numCount > 0) {
                map.set(item, numCount);
            } else {
                map.delete(item);
            }
        }
    }

    return result;
};