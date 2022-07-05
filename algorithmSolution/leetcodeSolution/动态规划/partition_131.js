/**
 * 131. 分割回文串
 * 中等
 * https://leetcode.cn/problems/palindrome-partitioning/
 * 
 * 解法：动态规划预处理 + 回溯
 * 
 * 参考 https://leetcode.cn/problems/palindrome-partitioning/solution/hui-su-you-hua-jia-liao-dong-tai-gui-hua-by-liweiw/
 */
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
    // 使用动态规划得到所有的子串是否是回文串
    let n = s.length;
    if (n == 0) {
        return [];
    }

    // 预处理：存储是否是回文状态
    // 状态：dp[i][j] 表示 s[i][j] 是否是回文，是则存true
    // 状态转移方程：当i >= j 时，dp[i][j] = true；当 i < j时，dp[i][j] = dp[i + 1][j - 1] 且 s[i] == s[j]
    const dp = Array.from(new Array(n), () => new Array(n).fill(true));
    for (let i = n - 1; i >= 0; --i) {
        for (let j = i + 1; j < n; ++j) {
            dp[i][j] = (s[i] === s[j]) && dp[i + 1][j - 1];
        }
    }

    /**
     * 
     * @param {*} index 起始字符索引
     * @param {*} track 选择的结果
     */
    const dfs = (index, track) => {
        if (index == n) { // 遍历到最后一个字符结束
            res.push(track.slice(0));
            return;
        }

        for (let i = index; i < n; i++) {
            if (!dp[index][i]) {
                continue; // 不是回文串则跳过
            }

            const item = s.substring(index, i + 1); // 是回文串，则截取这个回文串
            track.push(item); // 选择
            dfs(i + 1, track); // 从下一个字符开始回溯
            track.pop(); // 撤销选择
        }
    }

    let res = [];
    const track = [];
    dfs(0, track);
    return res;
};