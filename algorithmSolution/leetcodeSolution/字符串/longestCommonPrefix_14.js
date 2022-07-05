/**
 * 14. 最长公共前缀
 * 简单
 * https://leetcode.cn/problems/longest-common-prefix/
 * 
 * 解法：字符串
 */
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    if (strs.length == 0) {
        return '';
    }

    // 找到两两的最长公共前缀
    let n = strs.length;

    let prefix = strs[0];

    for (let i = 1; i < n; i++) {
        // 找到当前字符串跟之前的公共前缀prefix的公共前缀
        prefix = findPrefix(strs[i], prefix);
        if (prefix == '') {
            break;
        }
    }

    return prefix;
};

// 找两个字符串的公共前缀
const findPrefix = (str1, str2) => {
    let len1 = str1.length;
    let len2 = str2.length;
    const len = Math.min(len1, len2);

    let prefix = '';
    let i = 0;
    while (i < len) {
        if (str1[i] == str2[i]) {
            i++;
        } else {
            break;
        }
    }

    prefix = str1.substring(0, i);

    return prefix;
}