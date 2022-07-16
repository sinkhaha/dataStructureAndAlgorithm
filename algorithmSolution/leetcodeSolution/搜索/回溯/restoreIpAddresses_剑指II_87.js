
/**
 * 剑指 Offer II 087. 复原 IP 
 * 中等
 * https://leetcode.cn/problems/0on3uN/
 * 
 * 解法：回溯
 * 
 */
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
    // IP一共有四位, 每位整数位于 0 到 255 之间组成，且不能含有前导 0

    const len = s.length;
    if (len > 12 || len < 4) {
        return [];
    }

    const dfs = (start, track) => {
        if (track.length > 4) {
            return;
        }

        // 遍历到末尾了，且分成了4段
        if (start === len && track.length === 4) {
            result.push(track.join('.'));
            return result;
        }

        let temp = '';
        for (let i = start; i < len; ++i) {
            temp += s[i];

            // 第1位置上的数字是0时，只有0才符合条件，'01'则不符合条件
            if (+temp >= 0 && +temp <= 255 && (temp[0] !== '0' || temp == '0')) {
                track.push(temp);
                dfs(i + 1, track);
                track.pop();
            }
        }
    };

    let result = [];
    let track = [];

    dfs(0, track);

    return result;
};