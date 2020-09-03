/**
 * leetcode 28 easy
 * 
 * 实现 strStr() 函数:
 * 给定一个 txt 字符串和一个 pat 字符串，在 txt 字符串中找出 pat 字符串出现的
 * 第一个位置 (从0开始)。如果不存在，则返回  -1。
 *
 * 输入: txt = "hello", pat = "ll"
 * 输出: 2
 * 
 * 暴力解法：
 * 时间复杂度 O(MN)，空间复杂度O(1)
 * @param {string} txt
 * @param {string} pat
 * @return {number}
 */
var strStr1 = function(txt, pat) {
    let N = txt.length;
    let M = pat.length;

    for (let i = 0; i < N - M; i++) {
        let j;
        for (j = 0; j < M; j++) {
            if (txt[i + j] !== pat[j]) {
                break;
            }
        }
        if (j === M) {
            return i;
        }
    }

    return -1;
};

const haystack = 'hello';
const needle = 'll';
console.log(strStr1(haystack, needle)); // 2
