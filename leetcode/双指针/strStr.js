/**
 * 暴力解法：
 * 时间复杂度 O(MN)，空间复杂度O(1)
 * @param {string} txt
 * @param {string} pat
 * @return {number}
 */
var strStr = function(txt, pat) {
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
console.log(strStr(haystack, needle));
