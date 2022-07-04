/**
 * 剑指 Offer II 035. 最小时间差
 * 中等
 * https://leetcode.cn/problems/569nqc/
 * 
 * 解法：排序
 */
/**
 * @param {string[]} timePoints
 * @return {number}
 */
var findMinDifference = function (timePoints) {
    // 排序 
    // 将timePoints从小到大排序后，最小时间差必然出现在timePoints 的两个相邻时间，或者timePoints的两个首尾时间中。因此排序后遍历一遍timePoints 即可得到最小时间差

    timePoints.sort();

    let ans = Number.MAX_VALUE;

    let t0Minutes = getMinutes(timePoints[0]);
    let preMinutes = t0Minutes;

    for (let i = 1; i < timePoints.length; ++i) {
        const minutes = getMinutes(timePoints[i]);
        ans = Math.min(ans, minutes - preMinutes); // 相邻时间的时间差
        preMinutes = minutes;
    }

    ans = Math.min(ans, t0Minutes + 1440 - preMinutes); // 首尾时间的时间差

    return ans;
};

const getMinutes = (t) => {
    return ((t[0].charCodeAt() - '0'.charCodeAt()) * 10 +
        (t[1].charCodeAt() - '0'.charCodeAt())) * 60 +
        (t[3].charCodeAt() - '0'.charCodeAt()) * 10 +
        (t[4].charCodeAt() - '0'.charCodeAt());
}