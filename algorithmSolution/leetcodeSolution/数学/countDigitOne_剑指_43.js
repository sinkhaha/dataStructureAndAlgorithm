/**
 * 剑指 Offer 43. 1～n 整数中 1 出现的次数
 * 困难
 * https://leetcode.cn/problems/1nzheng-shu-zhong-1chu-xian-de-ci-shu-lcof/
 * 
 */
/**
 * @param {number} n
 * @return {number}
 */
var countDigitOne = function (n) {

    // mulk 表示 10^k
    // 在下面的代码中，可以发现 k 并没有被直接使用到（都是使用 10^k）
    // 但为了让代码看起来更加直观，这里保留了 k
    let mulk = 1;
    let ans = 0;
    for (let k = 0; n >= mulk; ++k) {
        ans += (Math.floor(n / (mulk * 10))) * mulk + Math.min(Math.max(n % (mulk * 10) - mulk + 1, 0), mulk);
        mulk *= 10;
    }
    return ans;
};