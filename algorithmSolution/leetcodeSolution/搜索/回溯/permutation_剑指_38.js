/**
 * 剑指 Offer 38. 字符串的排列
 * 中等
 * https://leetcode.cn/problems/zi-fu-chuan-de-pai-lie-lcof/
 * 
 * 解法：回溯
 */
/**
 * @param {string} s
 * @return {string[]}
 */
var permutation = function (s) {
    // 回溯 
    // 注意：s可能有重复字符，回溯后结果可能有重复的值
    let n = s.length;
    if (n <= 1) {
        return [s];
    }

    let visited = []; // 标记某个索引的值是否访问过了
    let allResult = [];

    this.backtrack = function (s, n, track) {
        // 选择的个数满足全排列的个数，则加入结果集
        if (track.length == n) {
            allResult.push(track.slice().join(''));
            return;
        }

        for (let j = 0; j < n; j++) {
            if (visited[j] == true) { // 已经加入过的，跳过
                continue;
            }
            // 选择
            track.push(s[j]);
            visited[j] = true;
            // 回溯 选择一位，则
            this.backtrack(s, n, track);
            // 撤回
            track.pop();
            visited[j] = false;
        }
    }

    let track = [];
    this.backtrack(s, n, track);

    // 过滤重复的排列值
    let map = new Map(); // key为排列值，value为1，最终结果即取map的所有key
    for (let item of allResult) {
        if (map.has(item)) {
            continue;
        }
        map.set(item, 1);
    }

    return Array.from(map.keys());
};