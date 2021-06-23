/**
 * 389 找不同
 * 
 * 简单
 * https://leetcode-cn.com/problems/find-the-difference/
 */
/**
 * 利用^异或的性质，n ^ n = 0, n ^ 0 = n
 * 
 * 时间复杂度O(n),n为s的长度
 * 
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function (s, t) {
    if (!s) {
        return t;
    }

    // 因为t比s多一个字符，所以可以先默认取t最后一个字符，字符转成unicode
    let result = t.charCodeAt(t.length - 1);

    // 获取字符的unicode值
    for (let i = 0; i < s.length; i++) {
        result ^= s.charCodeAt(i);
        result ^= t.charCodeAt(i);
    }

    // unicode转成字符
    return String.fromCharCode(result);
};

const s = "";
const t = "b";
console.log(findTheDifference(s, t));
