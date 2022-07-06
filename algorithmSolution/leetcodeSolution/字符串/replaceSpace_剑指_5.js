/**
 * 剑指 Offer 05. 替换空格
 * 简单
 * https://leetcode.cn/problems/ti-huan-kong-ge-lcof/
 * 
 * 
 */
/**
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function (s) {
    let rst = '';
    for (let c of s) {
        rst += c == ' '
            ? '%20'
            : c;
    }
    return rst;
};