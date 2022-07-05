/**
 * 89. 格雷编码
 * 中等
 * https://leetcode.cn/problems/gray-code/
 * 
 * 解法：位运算
 */
/**
 * @param {number} n
 * @return {number[]}
 */
var grayCode = function (n) {

    const ret = [0];

    for (let i = 1; i <= n; i++) {
        const m = ret.length;
        for (let j = m - 1; j >= 0; j--) {
            ret.push(ret[j] | (1 << (i - 1)));
        }
    }

    return ret;
};