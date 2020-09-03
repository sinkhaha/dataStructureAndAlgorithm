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

const txt = 'hello';
const pat = 'll';
console.log(strStr1(txt, pat)); // 2

// kmp
var strStr2 = function(txt, pat) {
    
};
