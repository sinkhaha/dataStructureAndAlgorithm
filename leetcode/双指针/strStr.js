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
 * 暴力解法一：
 * 时间复杂度 O(MN)
 * 空间复杂度O(1)
 * 
 * @param {string} txt
 * @param {string} pat
 * @return {number}
 */
var strStr1 = function(txt, pat) {
    let N = txt.length;
    let M = pat.length;

    // 都为空，返回0
    if (!N && !M || (N === M)) {
        return 0;
    }

    for (let i = 0; i < N - M; i++) {
        let j;
        for (j = 0; j < M; j++) {
            // 模式串有一位不等于文本串的值，则跳过
            if (pat[j] !== txt[i + j] ) {
                break;
            }
        }
        // 当模式串遍历完了，即说明pat前面都位全都匹配了
        if (j === M) {
            return i;
        }
    }

    return -1;
};

const txt1 = '';
const pat1 = 'a';
console.log(strStr1(txt1, pat1)); // -1

const txt2 = 'hello';
const pat2 = 'll';
console.log(strStr1(txt2, pat2)); // 2

const txt3 = '';
const pat3 = '';
console.log(strStr1(txt3, pat3)); // 0

const txt4 = 'a';
const pat4 = 'a';
console.log(strStr1(txt4, pat4)); // 0

/**
 * 
 * 时间复杂度：O((N - L)L)，其中 N 为 txt 字符串的长度，L 为 pat 字符串的长度。
 * 内循环中比较字符串的复杂度为 L，总共需要比较 (N - L) 次
 *
 * 空间复杂度：O(1)O(1)
 *
 * @param {*} txt 
 * @param {*} pat 
 */
var strStr2 = function(txt, pat) {
    let L = pat.length;
    let n = txt.length;

    for (let j = 0; j < n - L + 1; ++j) {
      const sub = txt.substring(j, j + L);
      if (sub == pat) {
        return j;
      }
    }
    return -1;
}

console.log(strStr2(txt1, pat1)); // -1
console.log(strStr2(txt2, pat2)); // 2
console.log(strStr2(txt3, pat3)); // 0
console.log(strStr2(txt4, pat4)); // 0
