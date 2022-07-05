/**
 * 395. 至少有 K 个重复字符的最长子串
 * 中等
 * https://leetcode.cn/problems/longest-substring-with-at-least-k-repeating-characters/
 * 
 * 解法：分治 + 递归
 */
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestSubstring = function (s, k) {
    // 如果字符串存在某个字符c，其出现的次数小于k，则任何包含字符c的子串都不可能满足需求
    // 可以将字符串按字符c分成若干段，则满足要求的最长子串一定出现在某个被切分的段内，而不能跨越一个或多个段
    const n = s.length;
    return dfs(s, 0, n - 1, k);
};

const dfs = (s, l, r, k) => {

    // 存[l,r]区间，每个字符出现的次数
    const cnt = new Array(26).fill(0);
    for (let i = l; i <= r; i++) {
        cnt[s[i].charCodeAt() - 'a'.charCodeAt()]++;
    }

    let splitChar = null;
    for (let i = 0; i < 26; i++) {
        if (cnt[i] > 0 && cnt[i] < k) {
            splitChar = String.fromCharCode(i + 'a'.charCodeAt()); // 找到出现次数小于k的字符
            break;
        }
    }
    // 说明[l,r]间的每个字符的出现次数都大于k，那[l,r]就是最大区间
    if (splitChar == null) {
        return r - l + 1;
    }

    let i = l;
    let ret = 0;
    while (i <= r) {
        // 找到不包含splitChar字符的开始位置
        while (i <= r && s[i] === splitChar) {
            i++;
        }
        if (i > r) {
            break;
        }

        // 找到不包含splitChar字符的结束位置
        let start = i;
        while (i <= r && s[i] !== splitChar) {
            i++;
        }

        // 说明[l, start]和[i, r]两边的区间包含splitChar字符，不可能满足需求，只有中间区间[start, i-1]包含splitChar字符，继续递归求值
        const length = dfs(s, start, i - 1, k);
        ret = Math.max(ret, length);
    }

    return ret;
};