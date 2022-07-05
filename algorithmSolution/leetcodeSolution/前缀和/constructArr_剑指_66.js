/**
 * 剑指 Offer 66. 构建乘积数组
 * 中等
 * https://leetcode.cn/problems/gou-jian-cheng-ji-shu-zu-lcof/
 * 
 * 解法：前缀和
 */
/**
 * @param {number[]} a
 * @return {number[]}
 */
var constructArr = function (a) {
    // 方法一：时间O(n) 空间O(n)
    // 用两个数组L和R，L[i]表示i左侧所有数字的乘积，R[i]表示i右侧所有数字的乘积
    // 所以L[i] = L[i-1] * a[i-1] 其中 L[0] = 1
    // 所以R[i] = R[i+1] * a[i+1] 其中 R[a.length - 1] = 1

    // 方法二：时间O(n) 空间O(1)
    // 可以把方法一到R数组去掉，改成在迭代过程中用一个变量保存i右边所有数字的乘积

    let len = a.length;
    if (len == 0) {
        return [];
    }

    let result = new Array(len);
    result[0] = 1;

    for (let i = 1; i < len; i++) {
        result[i] = result[i - 1] * a[i - 1];
    }

    let R = 1;
    for (let i = len - 1; i >= 0; i--) {
        result[i] = result[i] * R; // 于索引 i，左边的乘积为 answer[i]，右边的乘积为 R
        R *= a[i]; // R 需要包含右边所有的乘积，所以计算下一个结果时需要将当前值乘到 R 上
    }

    return result;
};