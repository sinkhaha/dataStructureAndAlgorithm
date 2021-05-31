/**
 * 793. 阶乘函数后K个零
 * 
 * 困难
 * https://leetcode-cn.com/problems/preimage-size-of-factorial-zeroes-function/
 * 
 * 问题可以转化为
 * 在区间 [0, MAX_VALUE] 中寻找满足 trailingZeroes(n) == K 的左侧边界和右侧边界
 * 
 * 其实就是在问，满足条件的 n 最小是多少，最大是多少，最大值和最小值一减，
 * 就可以算出来有多少个 n 满足条件了
 * 
 * @param {number} K
 * @return {number}
 */
var preimageSizeFZF = function (K) {
    // 左边界和右边界之差 + 1 就是答案
    return right_bound(K) - left_bound(K) + 1;
};

/**
 * 搜索 trailingZeroes(n) == K 的左侧边界
 * @param {*} target 
 */
function left_bound(target) {
    let lo = 0, hi = Number.MAX_VALUE;
    while (lo < hi) {
        let mid = lo + Math.floor((hi - lo) / 2);
        if (trailingZeroes(mid) < target) {
            lo = mid + 1;
        } else if (trailingZeroes(mid) > target) {
            hi = mid;
        } else {
            hi = mid;
        }
    }

    return lo;
}

/**
 * 搜索 trailingZeroes(n) == K 的右侧边界
 * @param {*} target 
 */
function right_bound(target) {
    let lo = 0, hi = Number.MAX_VALUE;
    while (lo < hi) {
        let mid = lo + Math.floor((hi - lo) / 2);
        if (trailingZeroes(mid) < target) {
            lo = mid + 1;
        } else if (trailingZeroes(mid) > target) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }

    return lo - 1;
}

/**
 * 求n!结果尾数中零的数量  172题度解法
 * @param {*} n 
 */
var trailingZeroes = function(n) {
    let res = 0;
    for (let d = n; Math.floor(d / 5) > 0; d = Math.floor(d / 5)) {
        res += Math.floor(d / 5);
    }
    return res;
};

// TODO
const K = 0;
console.log(preimageSizeFZF(K));
