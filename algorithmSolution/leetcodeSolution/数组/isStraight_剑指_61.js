/**
 * 剑指 Offer 61. 扑克牌中的顺子
 * 简单
 * https://leetcode.cn/problems/bu-ke-pai-zhong-de-shun-zi-lcof/
 * 
 */
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isStraight = function (nums) {
    // 5张牌，除去大小王，(最大值 - 最小值 < 5)则表示是顺子

    const puke = new Set(); // 存扑克的牌号，不存大王

    let min = 14; // 因为数组最大值只会是13，所以此处用14表示绝对大的值
    let max = 0;

    for (let num of nums) {
        if (num == 0) { // 大王跳过
            continue;
        }
        if (puke.has(num)) { // 出现重复的牌，表示不是顺子
            return false;
        }

        max = Math.max(max, num);
        min = Math.min(min, num);

        puke.add(num);
    }

    return max - min < 5;
};