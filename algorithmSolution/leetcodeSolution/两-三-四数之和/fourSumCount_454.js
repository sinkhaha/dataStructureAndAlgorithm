/**
 * 454. 四数相加 II
 * 中等
 * https://leetcode.cn/problems/4sum-ii/
 * 
 * 解法：分组 + 哈希表
 * 参考https://leetcode.cn/problems/4sum-ii/solution/chao-ji-rong-yi-li-jie-de-fang-fa-si-shu-xiang-jia/
 * 
 * 时间O(n^2) 
 * 空间O(n^2)
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 */
var fourSumCount = function (A, B, C, D) {
    // 首先求出 A 和 B 任意两数之和 sumAB，以 sumAB 为 key，sumAB 出现的次数为 value，存入 hashmap 中
    // 然后计算 C 和 D 中任意两数之和的相反数 sumCD，在 hashmap 中查找是否存在 key 为 sumCD

    const mapAB = new Map(); // key是 和，value是 出现次数
    let res = 0;
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < B.length; j++) {
            let sum = A[i] + B[j];
            if (mapAB.has(sum)) {
                mapAB.set(sum, mapAB.get(sum) + 1);
            } else {
                mapAB.set(sum, 1);
            }
        }
    }

    for (let i = 0; i < C.length; i++) {
        for (let j = 0; j < D.length; j++) {
            let sumCD = -(C[i] + D[j]);
            if (mapAB.has(sumCD)) {
                res += mapAB.get(sumCD);
            }
        }
    }

    return res;
};