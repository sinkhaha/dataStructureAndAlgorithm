const KMP = require('./kmp算法');

/**
 * 28. 实现 strStr()
 * 简单
 * https://leetcode-cn.com/problems/implement-strstr/
 * 
 * 题目： 
 * 给定一个 haystack 字符串和一个 needle 字符串，
 * 在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。
 * 如果不存在，则返回  -1。
 * 
 * 例子：
 * 输入: haystack = "hello", needle = "ll"
 * 输出: 2
 * 
 * 解法：利用kmp字符串匹配算法
 * 
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  const kmp = new KMP(needle);
  return kmp.search(haystack);
};
const haystack = 'aaaaa';
const needle = 'bba';
console.log(strStr(haystack, needle)); // -1

/**
 * 暴力解法
 * 
 * 时间复杂度 O(MN)
 * 空间复杂度O(1)
 * 
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr2 = function (haystack, needle) {
  let L = needle.length;
  let n = haystack.length;

  for (let j = 0; j < n - L + 1; ++j) {
    const sub = haystack.substring(j, j + L);
    if (sub == needle) {
      return j;
    }
  }
  return -1;
};

console.log(strStr2(haystack, needle)); // -1
