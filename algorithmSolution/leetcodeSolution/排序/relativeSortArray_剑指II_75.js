/**
 * 剑指 Offer II 075. 数组相对排序
 * 简单
 * https://leetcode.cn/problems/0H97ZC/
 * 
 * 解法：排序 + 哈希表
 */
/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
var relativeSortArray = function (arr1, arr2) {
    const map = new Map();
    for (let num of arr1) {
        map.set(num, (map.get(num) || 0) + 1);
    }

    // 对arr2中出现的数据进行排序
    let idx = 0;
    for (let num of arr2) {
        while (map.get(num)) {
            arr1[idx] = num;
            idx++;
            map.set(num, map.get(num) - 1);
        }
        map.delete(num);
    }

    // 对剩下的数据排序
    let rst = [];
    map.forEach((value, key) => {
        rst.push(key);
    })
    rst.sort((a, b) => a - b);

    for (let num of rst) {
        while (map.get(num)) {
            arr1[idx++] = num;
            map.set(num, map.get(num) - 1);
        }
    }
    return arr1;
};