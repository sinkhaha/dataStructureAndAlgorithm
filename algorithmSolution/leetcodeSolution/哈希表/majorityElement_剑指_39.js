/**
 * 剑指 Offer 39. 数组中出现次数超过一半的数字
 * 简单
 * https://leetcode.cn/problems/shu-zu-zhong-chu-xian-ci-shu-chao-guo-yi-ban-de-shu-zi-lcof/
 * 
 * 解法：哈希表
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    const map = new Map();

    for (let num of nums) {
        if (map.has(num)) {
            map.set(num, map.get(num) + 1);
        } else {
            map.set(num, 1);
        }
    }

    let maxNum;
    let maxCount;

    for (let key of map.keys()) {
        const count = map.get(key);
        if (!maxCount || count > maxCount) {
            maxNum = key;
            maxCount = map.get(key);
        }
    }

    return maxNum;
};